const fetch = require("node-fetch");
const { getTodayDate, getYesterdayDate } = require("./utils");

const { tdate, tmonth, tyear } = getTodayDate();
const { ydate, ymonth, yyear } = getYesterdayDate();

const yesterdayDate = `${yyear}-${ymonth}-${ydate}`;
const todayDate = `${tyear}-${tmonth}-${tdate}`;

async function createChangelog(since = yesterdayDate, until = todayDate) {
  let changelogBody = [];
  await fetch(
    `https://api.github.com/repos/cssnano/cssnano/commits?branch=master&since=${since}&until=${until}`
  )
    .then(r => r.json())
    .then(commits => {
      commits.forEach(({ commit, html_url, author }) => {
        let commitAuthor = author;
        if (Array.isArray(author)) {
          commitAuthor = author[0];
        }
        changelogBody.push(
          ` - ${commit.message.split("\n")[0]} (${html_url}) - by (${
            commitAuthor.login
          })`
        );
      });
    });

  return { body: changelogBody.join("\n"), changelogArray: changelogBody };
}

module.exports = createChangelog;
