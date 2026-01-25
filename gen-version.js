const { execSync } = require("child_process");

const STAGE = "alpha";
const MAJOR = 0;

const now = new Date();
const YEAR = now.getFullYear();
const MONTH = now.getMonth() + 1;

const TAG_PREFIX = `v${YEAR}.${MONTH}.${MAJOR}.`;

function getLastPatch() {
  try {
    const tags = execSync("git tag", { encoding: "utf8" })
      .split("\n")
      .filter(t => t.startsWith(TAG_PREFIX));

    if (tags.length === 0) return 0;

    return Math.max(
      ...tags.map(t => Number(t.replace(TAG_PREFIX, "")))
    );
  } catch {
    return 0;
  }
}

const PATCH = getLastPatch() + 1;

const tag = `${TAG_PREFIX}${PATCH}`;
const release = `${tag}-${STAGE}`;

console.log(`TAG=${tag}`);
console.log(`RELEASE=${release}`);
