const version = "nightly";

module.exports = {
  cssnano: {
    cosmiconfig: "^5.2.1",
    "cssnano-preset-default": version,
    "is-resolvable": "^1.1.0",
    "opencollective-postinstall": "^2.0.2",
    postcss: "^7.0.16"
  },
  "cssnano-preset-default": {
    "css-declaration-sorter": "^5.1.2",
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-calc": "^7.0.1",
    "postcss-colormin": version,
    "postcss-convert-values": version,
    "postcss-discard-comments": version,
    "postcss-discard-duplicates": version,
    "postcss-discard-empty": version,
    "postcss-discard-overridden": version,
    "postcss-merge-longhand": version,
    "postcss-merge-rules": version,
    "postcss-minify-font-values": version,
    "postcss-minify-gradients": version,
    "postcss-minify-params": version,
    "postcss-minify-selectors": version,
    "postcss-normalize-charset": version,
    "postcss-normalize-display-values": version,
    "postcss-normalize-positions": version,
    "postcss-normalize-repeat-style": version,
    "postcss-normalize-string": version,
    "postcss-normalize-timing-functions": version,
    "postcss-normalize-unicode": version,
    "postcss-normalize-url": version,
    "postcss-normalize-whitespace": version,
    "postcss-ordered-values": version,
    "postcss-reduce-initial": version,
    "postcss-reduce-transforms": version,
    "postcss-svgo": version,
    "postcss-unique-selectors": version
  },
  "cssnano-preset-advanced": {
    autoprefixer: "^9.5.1",
    "cssnano-preset-default": version,
    "postcss-discard-unused": version,
    "postcss-merge-idents": version,
    "postcss-reduce-idents": version,
    "postcss-zindex": version
  },
  "postcss-merge-longhand": {
    "css-color-names": "^1.0.1",
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1",
    stylehacks: version
  },
  "postcss-merge-idents": {
    "cssnano-utils": version,
    has: "^1.0.3",
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  },
  "postcss-merge-rules": {
    browserslist: "^4.6.0",
    "caniuse-api": "^3.0.0",
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-selector-parser": "^3.1.1",
    vendors: "^1.0.3"
  },
  "postcss-minify-gradients": {
    "cssnano-utils": version,
    "is-color-stop": "^1.1.0",
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  },
  "postcss-minify-params": {
    "alphanum-sort": "^1.0.2",
    browserslist: "^4.6.0",
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1",
    uniqs: "^2.0.0"
  },
  "postcss-normalize-display-values": {
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  },
  "postcss-normalize-repeat-style": {
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  },
  "postcss-normalize-timing-functions": {
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  },
  "postcss-ordered-values": {
    "cssnano-utils": version,
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  },
  "postcss-reduce-transforms": {
    "cssnano-utils": version,
    has: "^1.0.3",
    postcss: "^7.0.16",
    "postcss-value-parser": "^3.3.1"
  }
};
