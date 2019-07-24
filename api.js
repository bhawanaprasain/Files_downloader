var download = require("download-file");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

var XMLHttpRequest = require("node-http-xhr");
const Http = new XMLHttpRequest();

readline.question("What's your favourite movie?", name => {
  const url = `https://yts.lt/api/v2/list_movies.json?query_term=${name}`;
  Http.addEventListener("load", function() {
    var jsonObject = JSON.parse(Http.response);

    var id = jsonObject.data.movies[0].id;
    jsonObject.data.movies[0].id;
    const idURL = `https://yts.lt/api/v2/movie_reviews.json?movie_id=${id}`;
    Http.open("GET", idURL);
    var jsonObjectDetail = JSON.parse(Http.response);

    var movieFormat = jsonObjectDetail.data.movies[0].torrents;
    var qualityList = [];
    maxQuality = 0;

    movieFormat.forEach(sample => {
      var movieQuality = sample.quality;
      qualityList.push(movieQuality);
      maxQuality = 0;
      var torrentObject = {};
      qualityList.forEach(quality => {
        var slicedQuality = quality.slice(0, -1);

        if (maxQuality < Number(slicedQuality)) {
          maxQuality = Number(slicedQuality);
          torrentObject = sample;
        }
      });

      console.log(torrentObject);
      console.log(torrentObject.url);
      function downloadMovie() {
        var downloadURL = torrentObject.url;
        var options = {
          directory: "../../Downloads/",
          filename: "name.mp4"
        };
        download(downloadURL, options, function(err) {
          if (err) throw err;
          console.log("wow");
        });
      }

      const downloadQuery = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      });
      downloadQuery.question(
        "Do you want to download the torrent file with maximum quality?",
        ans => {
          if (ans == "y") {
            console.log("Download in progress");
            downloadMovie();
          }
        }
      );
    });
  });

  Http.open("GET", url);

  Http.send();
  readline.close();
});
