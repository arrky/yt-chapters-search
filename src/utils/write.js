import { writeFileSync } from "fs";

function writeJson(filepath, data) {
  const dataString = JSON.stringify(data, null, 2);
  writeFileSync(filepath, dataString);
}

export { writeJson };
