const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("175ce01d5c1a9ceefca08e78e77eba4c6b43611c975b1cb0628b36d34afac19c");

let movie = "Joker"

const params = {
  q: "imsdb "+movie,
  location: "Austin, Texas, United States",
  hl: "en",
  gl: "us",
  google_domain: "google.com"
};

const callback = function(data) {
  console.log(data["organic_results"][0]['link']);
};

// Show result as JSON
search.json(params, callback);