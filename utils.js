const { execFile } = require("child_process");
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
  },
  runNmp: argsOptions => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      const child = execFile("npm", argsOptions, (error, stdout, stderr) => {
        if (error) {
          console.error("stderr", stderr);
          return reject(error);
        }
        resolve();
      });
    });
  }
};
