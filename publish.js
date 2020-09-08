const simpleGit = require("simple-git/promise");
const shell = require("shelljs");
const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
const { fullVersion } = require("./versions");
const { ignorePackages } = require("./packageList");
const assert = require("assert");
const editJsonFile = require("edit-json-file");
const newdepList = require("./dependenciesList");
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

  if (fs.existsSync(cssnanoPath)) {
    await rimraf.sync(cssnanoPath);
  }

  await git.clone(cssnanoRepoLink);
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

  packagesList.forEach(pkg => {
    if (ignore.has(pkg)) {
      rimraf.sync(path.resolve(packagePath, pkg));
    }
  });

  assert.strictEqual(
    shell.ls("packages/").length + ignorePackages.length,
    42,
    "Something wrong while deleting ignored + deprecated package. Expected 42 but got " +
      parseInt(shell.ls("packages/").length + ignorePackages.length)
  );

  try {
    shell.exec("yarn install");
    shell.exec("yarn test:only");
    shell.exec("npx lerna link");
    shell.exec("yarn build:packages");
  } catch (error) {
    throw new Error(error);
  }

  /**
   * Publish script here,
   */
  packagesList.forEach(async pkg => {
    if (ignore.has(pkg)) {
      rimraf.sync(path.resolve(packagePath, pkg));
      return;
    }

    const pkgPath = cssnanoPath + "/packages/" + pkg;

    if (fs.existsSync(pkgPath + "/dist")) {
      shell.cd(pkgPath);
      let packageJson = editJsonFile(`${pkgPath}/package.json`);

      packageJson.set("scripts.prepublish", "");
      packageJson.set("scripts.prebuild", "");
      packageJson.set("version", `${version}-nightly.${fullVersion}`);
      //   packageJson.set("publishConfig.registry", registryUrl);

      if (newdepList[pkg]) {
        packageJson.set("dependencies", {
          ...packageJson.get("dependencies"),
          ...newdepList[pkg]
        });
      }

      packageJson.save();
      shell.cp("-R", __dirname + "/.npmrc", pkgPath);
      try {
        console.log("publishing ", pkg);
        shell.exec("npm publish --tag nightly");
      } catch (error) {
        throw new Error(error);
      }
    }
  });
};
