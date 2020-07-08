const fetch = require("node-fetch");
const { date, getTodayDate, getYesterdayDate } = require("./utils");

const { tdate, tmonth, tyear } = getTodayDate();
const { ydate, ymonth, yyear } = getYesterdayDate();

const yesterdayDate = `${yyear}-${ymonth}-${ydate}`;
const todayDate = `${tyear}-${tmonth}-${tdate}`;

async function isNewChange() {
  let commits = await fetch(
    //   temporary adding the "'2019-02-14'", replace it with `yesterdayDate`
    // "'2019-02-14'" - is the date of the last release
    `https://api.github.com/repos/cssnano/cssnano/commits?branch=master&since=${"2019-02-14"}&until=${todayDate}`
  );
  commits = await commits.json();
  return Array.isArray(commits) && commits.length > 0;
}

module.exports = isNewChange;
