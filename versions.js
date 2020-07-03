const date = new Date();
const semver = {
  major: date.getUTCFullYear() - 2020,
  minor: date.getUTCMonth() + 1,
  patch: date.getUTCDate()
};

module.exports = {
  semver,
  version: `${semver.major}.${semver.minor}.${semver.patch}`,
  date
};
