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