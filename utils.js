module.exports = {
  getTodayDate: () => {
    const d = new Date();
    return {
      tdate: d.getUTCDate(),
      tyear: d.getUTCFullYear(),
      tmonth: d.getUTCMonth() + 1
    };
  },
  getYesterdayDate: () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return {
      ydate: d.getUTCDate(),
      yyear: d.getUTCFullYear(),
      ymonth: d.getUTCMonth() + 1
    };
  }
};
