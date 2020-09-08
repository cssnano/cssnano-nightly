const version = "nightly";

module.exports = {
  cssnano: {
    "cssnano-preset-default": version,
  },
  "cssnano-preset-default": {
    "cssnano-utils": version,
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
    "cssnano-preset-default": version,
    "postcss-discard-unused": version,
    "postcss-merge-idents": version,
    "postcss-reduce-idents": version,
    "postcss-zindex": version
  },
  "cssnano-preset-lite": {
    "cssnano-utils": version,
    "postcss-discard-comments": version,
    "postcss-normalize-whitespace": version,
    "postcss-discard-empty": version
  },
  "postcss-merge-longhand": {
    stylehacks: version
  },
  "postcss-merge-idents": {
    "cssnano-utils": version
  },
  "postcss-merge-rules": {
    "cssnano-utils": version
  },
  "postcss-minify-gradients": {
    "cssnano-utils": version
  },
  "postcss-minify-params": {
    "cssnano-utils": version
  },
  "postcss-normalize-display-values": {
    "cssnano-utils": version
  },
  "postcss-normalize-repeat-style": {
    "cssnano-utils": version
  },
  "postcss-normalize-timing-functions": {
    "cssnano-utils": version
  },
  "postcss-ordered-values": {
    "cssnano-utils": version
  },
  "postcss-reduce-transforms": {
    "cssnano-utils": version
  }
};
