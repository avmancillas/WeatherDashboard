var key= "86fcb6cd390fc5ccbadac2ebd9459e39";


 function getweeklyForecast(cityValue){
     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=imperial`)
     .then((response) => response.json())
     .then ((data) => {
         console.log("success");
         console.log(data);
     

            document.getElementById('city1').innerText = data.list[5].dt_txt;
            document.getElementById("temperature1").innerText = `Temp: ${data.list[5].main.temp} °F`;
            document.getElementById("humidity1").innerText= `Humidity: ${data.list[5].main.humidity} %`;
            document.getElementById("wind-speed1").innerText= `Wind Speed: ${data.list[5].wind.speed} mph`;
            document.getElementById("icon1").setAttribute('src',`http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png`)

            document.getElementById('city2').innerText = data.list[13].dt_txt;
            document.getElementById("temperature2").innerText = `Temp: ${data.list[13].main.temp} °F`;
            document.getElementById("humidity2").innerText= `Humidity: ${data.list[13].main.humidity} %`;
            document.getElementById("wind-speed2").innerText= `Wind Speed: ${data.list[13].wind.speed} mph`;
            document.getElementById("icon2").setAttribute('src',`http://openweathermap.org/img/wn/${data.list[13].weather[0].icon}@2x.png`)

            document.getElementById('city3').innerText = data.list[21].dt_txt;
            document.getElementById("temperature3").innerText = `Temp: ${data.list[21].main.temp} °F`;
            document.getElementById("humidity3").innerText= `Humidity: ${data.list[21].main.humidity} %`;
            document.getElementById("wind-speed3").innerText= `Wind Speed: ${data.list[21].wind.speed} mph`;
            document.getElementById("icon3").setAttribute('src',`http://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png`)

            document.getElementById('city4').innerText = data.list[29].dt_txt;
            document.getElementById("temperature4").innerText = `Temp: ${data.list[29].main.temp} °F`;
            document.getElementById("humidity4").innerText= `Humidity: ${data.list[29].main.humidity} %`;
            document.getElementById("wind-speed4").innerText= `Wind Speed: ${data.list[29].wind.speed} mph`;
            document.getElementById("icon4").setAttribute('src',`http://openweathermap.org/img/wn/${data.list[29].weather[0].icon}@2x.png`)

            document.getElementById('city5').innerText = data.list[37].dt_txt;
            document.getElementById("temperature5").innerText = `Temp: ${data.list[37].main.temp} °F`;
            document.getElementById("humidity5").innerText= `Humidity: ${data.list[37].main.humidity} %`;
            document.getElementById("wind-speed5").innerText= `Wind Speed: ${data.list[37].wind.speed} mph`;
            document.getElementById("icon5").setAttribute('src',`http://openweathermap.org/img/wn/${data.list[37].weather[0].icon}@2x.png`)

    }
     )}



function citySearch(cityValue){   
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=imperial`)
         .then((response) => response.json())
         .then ((data) => {
         console.log("success");
         console.log(data);
            document.getElementById('cityNow').innerText = data.name;
            document.getElementById("temperatureNow").innerText = `Temp: ${data.main.temp} °F`;
            document.getElementById("humidityNow").innerText= `Humidity: ${data.main.humidity} %`;
            document.getElementById("wind-speedNow").innerText= `Wind Speed: ${data.wind.speed} mph`;
            document.getElementById("iconNow").setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            

        }
         
 
    
)} 

function getcitySearch() {
    
    var cityValue = document.getElementById('search-value').value;
    if (cityValue){
        citySearch(cityValue);
        getweeklyForecast(cityValue);
        document.getElementById("search-value").value = '';
        console.log("click is working")
    }
}

document.getElementById('search-btn').addEventListener("click", getcitySearch);
