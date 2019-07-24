const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
var XMLHttpRequest = require("node-http-xhr");
const Http = new XMLHttpRequest();

  readline.question("What's your favourite movie?", (name) => {
    const url = `https://yts.lt/api/v2/list_movies.json?query_term=${name}`;
    Http.addEventListener('load', function(){
  
        var jsonObject = JSON.parse(Http.response);
        // console.log(jsonObject);
        // console.log(jsonObject.status);
        // console.log(jsonObject.data.movies[0].summary);
        // console.log(jsonObject.data.movies[0].id);
        var id = jsonObject.data.movies[0].id
        jsonObject.data.movies[0].id
        const idURL = `https://yts.lt/api/v2/movie_reviews.json?movie_id=${id}`;
        Http.open("GET" , idURL);
        var jsonObjectDetail = JSON.parse(Http.response);
        // console.log(jsonObjectDetail);
        // console.log(jsonObjectDetail.data.movies[0]);
        // console.log(jsonObjectDetail.data.movies[0]);

        console.log(jsonObjectDetail.data.movies[0].torrents);
        var movieFormat = jsonObjectDetail.data.movies[0].torrents;
        var qualityList = [];
        maxQuality = 0;

      movieFormat.forEach(sample => {
        var movieQuality = sample.quality;
        console.log(movieQuality);
        qualityList.push(movieQuality);
        console.log(maxQuality);
      
      console.log(qualityList);
      slicedArray = [];
      maxQuality = 0;
      var torrentObject ={};
      qualityList.forEach(quality=>{
        var slicedQuality = quality.slice(0, -1);
        console.log(slicedQuality);
        
        slicedArray.push(slicedQuality);
          if(maxQuality< Number(slicedQuality) ){
            maxQuality = Number(slicedQuality);
            torrentObject = sample;
          }
          console.log(slicedArray);
          console.log(maxQuality);
        

         } );
        
         console.log(torrentObject);
         console.log(torrentObject.url)
      });
        
    });
   
    Http.open("GET" , url);

    Http.send();
    readline.close()
  })
  


// const URL = 'https://yts.lt/api/v2/list_movies.json ?movie_details';


// Http.onreadystatechange = (e)=> {
//     if(Http.readyState === 4 && Http.status=== 200){
//     var jsonObject = JSON.parse(Http.response);
//     console.log(jsonObject);

// }}

