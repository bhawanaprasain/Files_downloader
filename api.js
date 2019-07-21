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
        console.log(jsonObject);
        console.log(jsonObject.status);
        console.log(jsonObject.data.movies[0].summary);
        console.log(jsonObject.data.movies[0].id);
        var id = jsonObject.data.movies[0].id
        jsonObject.data.movies[0].id
        const idURL = `https://yts.lt/api/v2/movie_reviews.json?movie_id=${id}`;
        Http.open("GET" , idURL);
        var jsonObjectDetail = JSON.parse(Http.response);
        console.log(jsonObjectDetail);
        console.log(jsonObjectDetail.data.movies[0]);


        // console.log(jsonObject.data.movies[0].genres);
        
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

