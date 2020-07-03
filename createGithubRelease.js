const { Octokit } = require("@octokit/rest");
const createChangelog = require("./createChangelog");
const { githubToken } = require("./config");
const { tag } = require("./versions");

const octokit = new Octokit({
  auth: `token ${githubToken}`
});

// when running the action for first time. give the first argument of this as
// createChangelog('2019-02-14')
// and after that, keep it null i.e `createChange()` only
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

createGithubRelease();
