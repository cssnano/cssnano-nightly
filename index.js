const run = require("./publish");
const isNewChanges = require("./isNewChanges");

if (isNewChanges()) {
  run();
} else {
  process.stdout.write(
    `There is no new change in the cssnano repo since the last publish from our repo`
  );
}
