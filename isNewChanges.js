const fetch = require("node-fetch");
const { date, getTodayDate, getYesterdayDate } = require("./utils");

const { tdate, tmonth, tyear } = getTodayDate();
const { ydate, ymonth, yyear } = getYesterdayDate();

const yesterdayDate = `${yyear}-${ymonth}-${ydate}`;
const todayDate = `${tyear}-${tmonth}-${tdate}`;

async function isNewChange() {
  let commits = await fetch(
    `https://api.github.com/repos/cssnano/cssnano/commits?branch=master&since=${yesterdayDate}&until=${todayDate}`
  );
  commits = await commits.json();
  return Array.isArray(commits) && commits.length > 0;
}

module.exports = isNewChange;
