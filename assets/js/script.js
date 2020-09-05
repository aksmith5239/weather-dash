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
     //clear old content
     searchCityEl.textContent = "";
     
    var city = searchCity.name;
    var windSpeed = searchCity.wind.speed;
    var temperature = searchCity.main.temp;
    var weatherIcon = searchCity.weather[0].icon;
    var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
    var humidity = searchCity.main.humidity;
    var longitude = searchCity.coord.lon;
    var latitude = searchCity.coord.lat;
    var uvUrl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=8fe2f99f82675d0a0ea6fc0f216bf16d&lat=" + latitude + "&lon=" + longitude;
    
    
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

// fetch the UV index
    fetch(uvUrl).then(function(uvIndex){
        return uvIndex.json();     
    }) .then(function(uvIndex){
        var uvIndexRating = uvIndex[0].value;
        var showUvIndex = document.createElement("li");
        showUvIndex.classList = "list-group-item flex-row justify-space-between align-left border-0";
        
        if (uvIndexRating > 0 && uvIndexRating < 3) {
            showUvIndex.innerHTML = ("UV Index: " + "<span class='rounded bg-success text-white p-1'>" + uvIndexRating + "</span>");
        } else if (uvIndexRating > 3 && uvIndexRating < 6) {
            showUvIndex.innerHTML = ("UV Index: " + "<span class='rounded bg-info text-white p-1'>" + uvIndexRating + "</span>"); 
        } else if (uvIndexRating > 6 && uvIndexRating < 8) {
            showUvIndex.innerHTML = ("UV Index: " + "<span class='rounded bg-warning text-white p-1'>" + uvIndexRating + "</span>"); 
        } else {
            showUvIndex.innerHTML = ("UV Index: " + "<span class='rounded bg-danger text-white p-1'>" + uvIndexRating + "</span>"); 
        }
        
        // showUvIndex.innerHTML = ("UV Index: " + uvIndexRating);
        cityContainerEl.appendChild(showUvIndex);
    })


} //end display current city
// event listener
searchFormEl.addEventListener("submit", formSubmitHandler);
