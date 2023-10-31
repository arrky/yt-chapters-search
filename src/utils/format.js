import {
  hasDash,
  hasTimestamp
} from "./check.js";

import { compareStrings } from './compare.js';

function cleanTimestamped(str) {
  const timestampRegExp = /^\d+(:\d+)+/;

  let timestampRemoved = str.replace(timestampRegExp, '');

  let clean = timestampRemoved.trim();

  return clean;
}

function descriptionIntoQueries(description) {
  let split = description.split('\n');
  let trimmed = split.filter(n => n.trim());

  const timestamped = trimmed.filter(n => hasTimestamp(n));

  let queries = [];

  for (let i = 0; i < timestamped.length; i++) {
    if (!hasDash(timestamped[i])) {
      let query = cleanTimestamped(timestamped[i]);
      queries.push(query);
      continue
    }

    let query = cleanTimestamped(timestamped[i]);
    queries.push(query);
  }

  return queries;
}

function constructUntitledList(videoIds) {
  let ytUrl = `https://www.youtube.com/watch_videos?video_ids=${videoIds.shift()}`;

  for (let item of videoData) {
    ytUrl += `,${item.id.videoId}`;
  }
}

function getBestMatch(items, target) {
  titles = items.map(n => n.snippet.title);

  let bestMatch = ["", 0];

  for (let i = 0; i < items.length; i++) {
    comparison = compareStrings(target, titles[i]);

    if (comparison > bestMatch[1]) {
      bestMatch = [items[i], comparison];
    }
  }
}

export {
  descriptionIntoQueries,
  constructUntitledList,
  getBestMatch,
};
