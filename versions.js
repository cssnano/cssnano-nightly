const { version } = require("./config");

const date = new Date();
const semver = {
  major: 2020,
  minor: date.getUTCMonth() + 1,
  patch: date.getUTCDate()
};

const fullVersion = `${semver.major}.${semver.minor}.${semver.patch}`;
module.exports = {
  semver,
  fullVersion,
  date,
  tag: `${version}-nightly.${fullVersion}`
};
