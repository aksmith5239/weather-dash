m = moment();
var currentDay = m.format('dddd, MMMM Do');
console.log(currentDay);
var searchFormEl = document.querySelector("#search-form");
var searchNameEl = document.querySelector("#search"); // this is a variable that will hold a concatenated city, state, country


var getWeather = function(searchName) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchName + "&APPID=8fe2f99f82675d0a0ea6fc0f216bf16d";
    fetch (apiUrl)
            .then(function(response){
                
                if(response.ok) {
                    return response.json()
                    .then(function(response) {
                        console.log(response);
                        //once the display function is complete we will replace the second .then funciton with
                        //.then(function(data){

                        //}) 
                    })
                } else {
                    alert("Error: " + response.statusText);
                }
                
            })
            .catch(function(error) {
                alert("Unable to connect to Open Weather");
            })
            


    // //temporary apiUrl
    // var apiUrl= "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=8fe2f99f82675d0a0ea6fc0f216bf16d";
    
    // // //use this apiUrl when we get the search working
    // // var apiUrl =  "http://api.openweathermap.org/data/2.5/weather?q=" + searchName + " &appid=8fe2f99f82675d0a0ea6fc0f216bf16d";

    // fetch(apiUrl).then(function(response) {
    //     conosole.log(response);
    //     if(response.ok) {
    //         response.json().then(function(data){
                
    //         });
    //     } else {
    //         console.log("Error: " + response.statusText);
    //     }
    // })
    // .catch(function(error){
    //     console.log("Unable to connect to Open Weather");
    // });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var searchName = searchNameEl.value.trim();
    console.log(searchName);
    if (searchName) {
        getWeather(searchName);
        searchNameEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
} // end of formSubmitHandler

var displayCurrentCity = function() {
    // need current date
    // weather icon weather.icon
    // Name of city  name
    // temerature main.temp - convert temp to farenheit? use units = imperial
            //url...find?q=city&units=imperial
    // humidity main.humidity
    // windspeed wind.speed
    // UV Index  - for uv index need lat and lon  http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}
    // coord.lat   coord.lon
    //appid = personal api key


} //end display current city
// event listener
searchFormEl.addEventListener("submit", formSubmitHandler);