var searchFormEl = document.querySelector("#search-form");
var key = "8fe2f99f82675d0a0ea6fc0f216bf16d";
var cityName = "";

// this function is not yet ready to work: 

// var getWeather = function(cityName) {
    
    // //temporary apiUrl
    // var apiUrl= "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=8fe2f99f82675d0a0ea6fc0f216bf16d";
    
    // //use this apiUrl when we get the search working
    // // var apiUrl =  "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;

    // fetch(apiUrl).then(function(response) {
    //     conosole.log(response);
    //     if(response.ok) {
    //         response.json().then(function(data){
                
    //         });
    //     } else {
    //         alert("Error: " + response.statusText);
    //     }
    // })
    // .catch(function(error){
    //     alert("Unable to connect to Open Weather");
    // })
// }

// getWeather();


// this is currrently fetching info from openweather
fetch (
    "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=8fe2f99f82675d0a0ea6fc0f216bf16d"
)
.then(function(response){
    console.log(response);
    return response.json();
})
.then(function(response) {
    console.log(response);
})