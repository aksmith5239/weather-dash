m = moment();
var currentDay = m.format('M/d/YYYY');
var searchFormEl = document.querySelector("#search-form");
var searchCityEl = document.querySelector("#search-city"); // this is a variable that will hold a concatenated city, state, country
var cityContainerEl = document.querySelector("#city-container");
var titleEl = document.querySelector("#city-title");
var dayCardEl = document.querySelector("#day-card");
var cityListEl = document.querySelector("#city-list");

var savedCity = JSON.parse(localStorage.getItem("key")) || []; 
// if (!savedCity) {
//     savedCity = localStorage.getItem("city")
//     savedCity.split(",");
// } 
  

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


var getFiveDayForecast = function(searchCity) {
   
    var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial&appid=8fe2f99f82675d0a0ea6fc0f216bf16d"; 
    fetch(fiveDayUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
               displayFiveDayForecast(data, searchCity);
                
            });
        } else {
            alert("Error: " + response.statusText);
        }
        
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
}  

var saveCity = function(searchCity) {
    savedCity.unshift(searchCity);
    // console.log(searchCity);
    localStorage.setItem("key", JSON.stringify(savedCity))
}



var loadCity = function() {
   
    for(var i = 0; i < savedCity.length; i++) {
        var city = savedCity[i];
        // console.log(savedCity[i]);
        var listItemEl = document.createElement("li");
        listItemEl.classList = "list-group-item";
        listItemEl.textContent = (city);
        
        cityListEl.appendChild(listItemEl);
        
    }
    
}
loadCity();


var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var searchCity = searchCityEl.value.trim();
    if (searchCity) {
        getWeather(searchCity);
        getFiveDayForecast(searchCity);
        // savedCity(searchCity);
        saveCity(searchCity);
        searchCityEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
} // end of formSubmitHandler

var displayCurrentCity = function(searchCity) {
     //clear old content
    //  searchCityEl.textContent = "";
     
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
    
    titleEl.appendChild(cityTitleEl);

    var cityTemp = document.createElement("li");
    cityTemp.classList = "list-group-item flex-row justify-space-between align-left border-0";
    cityTemp.textContent = ("Temperature: " + temperature + " °F");
    
    
    var cityHumidity = document.createElement("li");
    cityHumidity.classList = "list-group-item flex-row justify-space-between align-left border-0";
    cityHumidity.textContent = ("Humidity: " + humidity + "%");
    
    
    var cityWindSpeed = document.createElement("li");
    cityWindSpeed.classList = "list-group-item flex-row justify-space-between align-left border-0";
    cityWindSpeed.textContent = ("Wind Speed: " + windSpeed + " MPH");
    
    
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


var displayFiveDayForecast = function(searchCity) {
   
// need for loop to find id of every day at noon - day 1 is an example
     
var forecast = searchCity.list  
    
for (var i = 0; i < forecast.length; i+=8) {
    // let date = new Date(forecast[i].dt * 1000);
    let date = moment(forecast[i].dt_txt).add(1,'d').format('M/D/YYYY');
    let temperature = forecast[i].main.temp;
    let humidity = forecast[i].main.humidity;
    let weatherIcon = forecast[i].weather[0].icon;
    let weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"; 
    

    var dateEl = document.createElement("h5")
    dateEl.textContent = date;
    dateEl.classList= "text-white";
    
    var dayCard = document.createElement("div");
    dayCard.classList = "card-body";
    dayCard.innerHTML = "<h5 class='text-white'>" + date + "<h5>  <img src='" + weatherIconUrl + "'></img><br><span class='card-text text-white'>Temp: " + temperature + " °F </span><br><span class='card-text text-white'>Humidity: " + humidity + " % </span>";
    dayCardEl.appendChild(dayCard);

}

} // end five day forecast




// event listener
searchFormEl.addEventListener("submit", formSubmitHandler);
