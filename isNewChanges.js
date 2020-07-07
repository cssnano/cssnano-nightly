const fetch = require("node-fetch");
const { date } = require("./utils");

let cssnanoLastCommitDate;

function isNewChange() {
  fetch("https://api.github.com/repos/cssnano/cssnano/commits/master")
    .then(res => res.json())
    .then(res => {
      fetch(
        `https://api.github.com/repos/cssnano/cssnano/git/commits/${res.sha}`
      )
        .then(r => r.json())
        .then(commit => {
          cssnanoLastCommitDate = new Date(commit.committer.date);

          fetch(
            "https://api.github.com/repos/cssnano/cssnano-nightly/commits/master"
          )
            .then(_ => _.json())
            .then(_ => {
              fetch(
                `https://api.github.com/repos/cssnano/cssnano-nightly/git/commits/${_.sha}`
              )
                .then(_ => _.json())
                .then(cres => {
                  const { message, committer } = cres;

                  const lastNightlyPubCommit = new Date(committer.date);

                  return (
                    cssnanoLastCommitDate.getTime() >
                    lastNightlyPubCommit.getTime()
                  );
                });
            });
        });
    });
}

module.exports = isNewChange;
