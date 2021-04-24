var key= "86fcb6cd390fc5ccbadac2ebd9459e39";
var weeklyForecastEl=document.querySelector(".weeklyForecast");
var cityElement = document.querySelector(".city");
var tempElement = document.querySelector(".temperature");
var humidityElement = document.querySelector(".humidity");
var windElement = document.querySelector(".wind-speed");
var uvElement = document.querySelector(".uv");

// function getweeklyForecast(citysearch){
//     var weeklyForecastEl=document.querySelector("#weeklyForecast");
//     weeklyForecastEl.innerHTML = '<h1 class= "weeklyForecast:</h1>';


//     for (var i = 0; i < data.list.length; i++){
//       if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

//     }
//     if (!citysearch){
//         return;
//     }
// }



function citySearch(cityValue){   
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=imperial`)
         .then((res) => res.json())
         .then ((data) => {
         console.log("success");
         console.log(data);


        //  for (var i = 0; i < data.list.length; i++){
        //    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

        //  }
        })
         .catch(error => {
         console.log("API fail" + error);
        });
 
    //getweeklyForecast(citySearch);
} 


// displayWeather(){
//     cityElement.innerHTML = `${weather.city}`;
//     tempElement.innerHTML = `${weather.temperature.value}`;
//     humidityElement.innerHTML = `${weather.humidity.value}`;
//     windElement.innerHTML = `${weather.wind.value}`;
//     uvElement.innerHTML = `${weather.uv.value}`;
// }

// var currentHistory;
// if (!JSON.parse(localStorage.getItem('weatherhistory'))) {

// }else {
//     currentHistory = JSON.parse(localStorage.getItem("weatherhistory"));
// }

// var historyItems =[];

// function getUVIndex (lat, lon) {
//     fetch("https://api.openweathermap.org/data/2.5/uvi?appid=86fcb6cd390fc5ccbadac2ebd9459e39&lat=${lat}&lon=${lon}"

//     )
//     .then((res) => res.json())
//     .then((data) => {
//         var bodyEl = document.querySelector(".card-body")
//         var uvElement = document.querySelector("uv-index");
//     }

//     getUVIndex(data.coord.lat, data.coord.lon);
// }

function getcitySearch() {
    
    var cityValue = document.querySelector('#search-value').value;
    if (cityValue){
        citySearch(cityValue);
        makerow(cityValue);
        document.querySelector("#search-value").value = '';
        console.log("click is working")
    }
}

document.querySelector('#search-btn').addEventListener("click", function (e) { e.preventDefault(); 
    getcitySearch});
