const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const { spawnRegistry } = require("./helper/registry");
const rimraf = require("rimraf");
const tmp = require("tmp");
const { runCli } = require("./helper/cli");
const { tag } = require("../versions");
const publish = require("../publish");

shell.config.fatal = true;
jest.setTimeout(400000);

const registryUrl = "http://localhost:4873/";

describe("E2E cssnano ", () => {
  let childFork;

  beforeAll(async () => {
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

    rimraf.sync("cssnano");
  });

  it("should mock " + tag, async done => {
    expect(1).toBe(1);
    done();
  });

  it("should install the latest nightly version" + tag, async done => {
    expect(
      shell.exec("npm install cssnano@" + tag + " --registry " + registryUrl)
        .code
    ).toBe(0);
    done();
  });

  it("should install the latest nightly tag", async done => {
    expect(
      shell.exec("npm install cssnano@nightly --registry " + registryUrl).code
    ).toBe(0);
    done();
  });

  it(
    "should minify the input using postcss cli and cssnano" + tag,
    async done => {
      await shell.cd(__dirname + "/fixture");
      await shell.exec(
        "npm install cssnano@" + tag + " --registry " + registryUrl
      );

      const cmdOutput = await runCli(
        path.resolve(__dirname, "../node_modules", ".bin", "postcss"),
        [
          path.resolve(__dirname, "./fixture/input.css"),
          "-o",
          path.resolve(__dirname, "./fixture/output.css")
        ]
      );
      expect(
        fs.existsSync(path.resolve(__dirname, "./fixture/output.css"))
      ).toBe(true);
      const outputCode = fs.readFileSync(
        path.resolve(__dirname, "./fixture/output.css"),
        "utf-8"
      );
      expect(outputCode.split("\n").length).toBe(1);
      done();
    }
  );
});
