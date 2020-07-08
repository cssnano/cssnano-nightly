const path = require("path");
const shell = require("shelljs");
const { spawnRegistry } = require("./helper/registry");
// const { runNmp } = require("./helper/npm");
// const { runCli } = require("./helper/cli");
const rimraf = require("rimraf");
const { getTempFolder } = require("./helper/fs-utils");
const tmp = require("tmp");
const { tag } = require("../versions");
const publish = require("../publish");

shell.config.fatal = true;
jest.setTimeout(400000);

const registryUrl = "http://localhost:4873/";

describe("E2E cssnano ", () => {
  let childFork;
  const folder = getTempFolder();
  let tmpDir;
  beforeAll(async () => {
    // tmpDir = tmp.dirSync();
    childFork = await spawnRegistry();
    try {
      await publish(registryUrl);
    } catch (error) {
      throw new Error(error);
    }
  });

  afterAll(() => {
    if (childFork) {
      childFork.kill();
    }
    if (tmpDir) {
      tmpDir.removeCallback();
    }
    rimraf.sync("cssnano");
  });

  it("should install the latest nightly version" + tag, async done => {
    expect(
      shell.exec("npm install cssnano@" + tag + " --registry " + registryUrl)
        .code
    ).toBe(0);
    done();
  });
});
