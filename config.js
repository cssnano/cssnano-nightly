module.exports = {
  gitClonedPath: __dirname,
  cssnanoPath: __dirname + "/cssnano",
  registry: process.env.REGISTRY_URL || "http://localhost:4873",
  cssnanoRepoLink: "https://github.com/cssnano/cssnano.git",
  nightlyRepo: "https://github.com/cssnano/cssnano-nightly.git",
  version: "4.0.0",
  githubToken: process.env.GITHUB_TOKEN
};
