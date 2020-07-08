const run = require("./publish");
const isNewChanges = require("./isNewChanges");

async function runAsync() {
  const shouldRun = await isNewChanges();

  if (shouldRun) {
    run();
  } else {
    process.stdout.write(
      `There is no new change in the cssnano repo since the last publish from our repo`
    );
  }
}

runAsync();
