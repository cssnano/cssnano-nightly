const { Octokit } = require("@octokit/rest");
const createChangelog = require("./createChangelog");
const { githubToken } = require("./config");
const { tag } = require("./versions");
const isNewChanges = require("./isNewChanges");

const octokit = new Octokit({
  auth: `token ${githubToken}`
});

const { body } = createChangelog();

function createGithubRelease() {
  octokit.repos
    .createRelease({
      owner: "cssnano",
      repo: "cssnano-nightly",
      tag_name: tag,
      body,
      draft: false
    })
    .then(res => {
      process.stdout.write(
        "Succesfully created a github release for tag: " + tag
      );
    })
    .catch(err => {
      throw new error(err);
      process.exit(1);
    });
}

async function runAsync() {
  const shouldRun = await isNewChanges();

  if (shouldRun) {
    createGithubRelease();
  } else {
    process.stdout.write(
      `There is no new change in the cssnano repo since the last publish from our repo`
    );
  }
}

runAsync();
