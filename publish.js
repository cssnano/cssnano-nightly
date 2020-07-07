const simpleGit = require("simple-git/promise");
const shell = require("shelljs");
const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
const { fullVersion } = require("./versions");
const { ignorePackages } = require("./packageList");
const assert = require("assert");
const editJsonFile = require("edit-json-file");
const {
  gitClonedPath,
  cssnanoPath,
  cssnanoRepoLink,
  nightlyRepo,
  registry,
  version
} = require("./config");

shell.config.fatal = true;
const ignore = new Set(ignorePackages);

module.exports = async function run(registryUrl = registry) {
  const git = simpleGit(gitClonedPath);

  if (!fs.existsSync(cssnanoPath)) {
    await git.clone(cssnanoRepoLink);
  }

  await shell.cd("cssnano");
  assert.strictEqual(
    /**
     * TODO: remove this when this script is being hosted and change it to
     * shell.ls().length, 15
     */
    ![15, 16].includes(shell.ls().length),
    false,
    "Something wrong with the project root folder's count. Please re-check" +
      " got " +
      shell.ls().length +
      " projects instead of 15"
  );

  const packagesList = shell.ls("packages/");
  const packagePath = cssnanoPath + "/packages";
  packagesList.forEach(package => {
    if (ignore.has(package)) {
      rimraf.sync(path.resolve(packagePath, package));
    }
  });

  assert.strictEqual(
    shell.ls("packages/").length + ignorePackages.length,
    41,
    "Something wrong while deleting ignored + deprecated package. Expected 41 but got " +
      parseInt(shell.ls("packages/").length + ignorePackages.length)
  );

  try {
    shell.exec("yarn");
    shell.exec("yarn test:only");
    shell.exec("yarn test:only");
    shell.exec("yarn build:packages");
  } catch (error) {
    throw new Error(error);
  }

  /**
   * Publish script here,
   */
  packagesList.forEach(async package => {
    if (ignore.has(package)) {
      rimraf.sync(path.resolve(packagePath, package));
      return;
    }

    const packagePath = cssnanoPath + "/packages/" + package;

    if (fs.existsSync(packagePath + "/dist")) {
      shell.cd(packagePath);
      let packageJson = editJsonFile(`${packagePath}/package.json`);
      packageJson.set("scripts.prepublish", "");
      packageJson.set("scripts.prebuild", "");
      packageJson.set("version", `${version}-nightly.${fullVersion}`);
      packageJson.save();
      shell.cp("-R", __dirname + "/.npmrc", packagePath);
      shell.exec("npm publish --registry" + registryUrl);
    }
  });
};
