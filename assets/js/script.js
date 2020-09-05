m = moment();
var currentDay = m.format('M/d/YYYY');
console.log(currentDay);
var searchFormEl = document.querySelector("#search-form");
var searchCityEl = document.querySelector("#search-city"); // this is a variable that will hold a concatenated city, state, country
var cityContainerEl = document.querySelector("#city-container");
var titleEl = document.querySelector("#city-title");

var getWeather = function(searchCity) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&APPID=8fe2f99f82675d0a0ea6fc0f216bf16d";
    fetch (apiUrl)
            .then(function(response){
                if(response.ok) {
                    response.json().then(function(data){
                       displayCurrentCity(data, searchCity);
                    
                    });
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
    var searchCity = searchCityEl.value.trim();
    if (searchCity) {
        getWeather(searchCity);
        searchCityEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
} // end of formSubmitHandler

var displayCurrentCity = function(searchCity) {
    console.log(searchCity);
    var city = searchCity.name;
    var windSpeed = searchCity.wind.speed;
    var temperature = searchCity.main.temp;
    
    var weatherIcon = searchCity.weather[0].icon;
    var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
    var humidity = searchCity.main.humidity;
    // var windSpeed = SearchCity.wind.speed;
    console.log(city);
    console.log(windSpeed);
    console.log(temperature);
    console.log(weatherIcon);
    console.log(humidity);

    //clear old content
    searchCityEl.textContent = "";


    //create our elements:
    var cityTitleEl = document.createElement("span");
    cityTitleEl.innerHTML = (city + " (" + currentDay + ")" + "<img src='" + weatherIconUrl + "'>");
    // console.log(cityTitleEl);
    // console.log(weatherIconUrl);
    titleEl.appendChild(cityTitleEl);

    var cityTemp = document.createElement("li");
    cityTemp.classList = "list-group-item flex-row justify-space-between align-left border-0";
    cityTemp.textContent = ("Temperature: " + temperature + " °F");
    console.log(cityTemp);
    
    var cityHumidity = document.createElement("li");
    cityHumidity.classList = "list-group-item flex-row justify-space-between align-left border-0";
    cityHumidity.textContent = ("Humidity: " + humidity + "%");
    console.log(cityHumidity);
    
    var cityWindSpeed = document.createElement("li");
    cityWindSpeed.classList = "list-group-item flex-row justify-space-between align-left border-0";
    cityWindSpeed.textContent = ("Wind Speed: " + windSpeed + " MPH");
    console.log(cityWindSpeed);
    
    cityContainerEl.appendChild(cityTemp);
    cityContainerEl.appendChild(cityHumidity);
    cityContainerEl.appendChild(cityWindSpeed);
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
