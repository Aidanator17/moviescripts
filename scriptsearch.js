const cheerio = require("cheerio");
const fetch = require("node-fetch");
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("175ce01d5c1a9ceefca08e78e77eba4c6b43611c975b1cb0628b36d34afac19c");
const express = require("express");
const session = require("express-session");
const path = require("path");
const port = process.env.PORT || 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
// Middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(port, async () => {
  console.log(`🚀 Server has started on port ${port}`);
});

app.get("/", async (req, res) => {
  res.render('index')
})

app.post("/", async (req, res) => {

  let movie = req.body.movie

  const params = {
    q: "imsdb " + movie,
    location: "Austin, Texas, United States",
    hl: "en",
    gl: "us",
    google_domain: "google.com"
  };

  const callback = async function (data) {
    let link = data["organic_results"][0]['link'];
    const response = await fetch(link)
    const text = await response
    const $ = cheerio.load(await text.text());
    // console.log(await text.text())
    res.render("results", {script:$("#mainbody > table:nth-child(3) > tbody > tr > td:nth-child(3) > table > tbody > tr > td > pre").html()})
  };

  // Show result as JSON
  search.json(params, callback);

})