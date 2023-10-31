import 'dotenv/config';
import fetch from "node-fetch";
import { getBestMatch } from "./utils/index.js";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  throw new Error("No API key is provided");
}

async function getYoutubeResults(query, resultsPerPage) {
  let url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;

  if (resultsPerPage) {
    url = `${url}&maxResults=${resultsPerPage}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function getDescription(id) {
  let url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&part=snippet&id=${id}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.items.length) {
    let videoResource = data.items[0];
    let description = videoResource.snippet.description;
    return description;
  }

  console.log("Video not found");
}

async function getBestResults(queries) {
  const videoData = [];

  let resultsPerPage = 10;

  for (let searchQuery of queries) {

    const data = await getYoutubeResults(searchQuery, resultsPerPage);

    if (data.error) {
      console.log(`\nError: ${data.error.message}\n`);
      return
    }

    const bestMatch = getBestMatch(data.items, searchQuery);

    videoData.push(bestMatch[0]);
  }

  return videoData;
}

export {
  getYoutubeResults,
  getDescription,
  getBestResults
};
