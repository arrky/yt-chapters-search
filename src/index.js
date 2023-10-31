import * as utils from "./utils/index.js";
import * as api from "./api.js";

async function main() {
  const videoId = await utils.promptVideoId();

  const description = await api.getDescription(videoId);

  if (!description) {
    return
  }

  let queries = utils.descriptionIntoQueries(description);

  let videoData = await getBestResults(queries);

  let videoIds = videoData.map(n => n.id.videoId);

  untitledList = utils.constructUntitledList(videoIds);

  console.log(untitledList);

  utils.writeJson("./data.json", videoData);
}

main();
