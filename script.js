window.addEventListener('load', function () {
  
  // Function to get the forecast, loop through only the days of the week and render data to the page
  function getDailyForecast(searchValue) {
    if (!searchValue) {
      return;
    }
    var outcome = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
    fetch(outcome)
      .then((res) => res.json())
      .then((data) => {
        // Select our forecast element and add a header to it
        var DailyforecastEl = document.querySelector('#Dailyforecast');
        DailyforecastEl.innerHTML = '<h4 class="mt-3">5-Day Forecast:</h4>';

        // Create a div and give it a class of row
        DailyforecastRowEl = document.createElement('div');
        DailyforecastRowEl.className = '"row"';

        // Loop over all forecasts
        for (var i = 0; i < data.list.length; i++) {
          
          if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
            // Create elements for a bootstrap card
            var bodyEl = document.createElement('div');
            var colEl = document.createElement('div');
            var cardEl = document.createElement('div');
            var windEl = document.createElement('p');
            var humidityEl = document.createElement('p');
            var bannerEl = document.createElement('h5');
            
            bodyEl.classList.add('card-body', 'p-2');
            colEl.classList.add('col-md-2');
            cardEl.classList.add('card', 'bg-primary', 'text-white');
            windEl.classList.add('card-text');
            windEl.textContent = `Wind Speed: ${data.list[i].wind.speed} MPH`;
            humidityEl.classList.add('card-text');
            humidityEl.textContent = `Humidity : ${data.list[i].main.humidity} %`;
            bannerEl.classList.add('card-banner');
            bannerEl.textContent = new Date(
              data.list[i].dt_txt
            ).toLocaleDateString();
            var imgEl = document.createElement('img');
            imgEl.setAttribute(
              'src',
              `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
            );
            var p1El = document.createElement('p');
            var p2El = document.createElement('p');
            p1El.classList.add('card-text');
            p1El.textContent = `Temp: ${data.list[i].main.temp_max} °F`;
            p2El.classList.add('card-text');
            p2El.textContent = `Humidity: ${data.list[i].main.humidity}%`;

            // Merge and put on the page
            colEl.appendChild(cardEl);
            bodyEl.appendChild(bannerEl);
            bodyEl.appendChild(imgEl);
            bodyEl.appendChild(windEl);
            bodyEl.appendChild(humidityEl);
            bodyEl.appendChild(p1El);
            bodyEl.appendChild(p2El);
            cardEl.appendChild(bodyEl);
            DailyforecastEl.appendChild(colEl);
          }
        }
      });
  }

  // Get the existing history from local storage IF it exists
  var currentHistory;
  if (!JSON.parse(localStorage.getItem('weatherhistory'))) {
    currentHistory = [];
  } else {
    currentHistory = JSON.parse(localStorage.getItem('weatherhistory'));
  }

  var historyItems = [];
  
  // Function to fetch and display the UV index
  function getUVIndex(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
    )
      .then((res) => res.json())
      .then((data) => {
        var bodyEl = document.querySelector('.card-body');
        var uvEl = document.createElement('p');
        uvEl.id = 'uv';
        uvEl.textContent = 'UV Index: ';
        var buttonEl = document.createElement('span');
        buttonEl.classList.add('btn', 'btn-sm');
        buttonEl.innerHTML = data.value;

        switch (data.value) {
          case data.value < 3:
            buttonEl.classList.add('btn-success');
            break;
          case data.value < 7:
            buttonEl.classList.add('btn-warning');
            break;
          default:
            buttonEl.classList.add('btn-danger');
        }

        bodyEl.appendChild(uvEl);
        uvEl.appendChild(buttonEl);
      });
  }

  const handleHistory = (term) => {
    if (currentHistory && currentHistory.length > 0) {
      var existingEntries = JSON.parse(localStorage.getItem('weatherhistory'));
      var newHistory = [...existingEntries, term];
      localStorage.setItem('weatherhistory', JSON.stringify(newHistory));
      // If no history, create one with the searchValue and save it localStorage
    } else {
      historyItems.push(term);
      localStorage.setItem('weatherhistory', JSON.stringify(historyItems));
    }
  };

  // Function that performs the API request and creates elements to render to the page
  function searchWeather(searchValue) {
    var outcome = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
    fetch(outcome)
      .then((res) => res.json())
      .then((data) => {
        // calls the history method
        if (!currentHistory.includes(searchValue)) {
          handleHistory(searchValue);
        }
        // Clear old content
        todayEl = document.querySelector('#today');
        todayEl.textContent = ' ';

        // Create html content for current weather
        var bannerEl = document.createElement('h3');
        bannerEl.classList.add('card-banner');
        bannerEl.textContent = `${
          data.name
        } (${new Date().toLocaleDateString()})`;
        var cardEl = document.createElement('div');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        var tempEl = document.createElement('p');
        var cardBodyEl = document.createElement('div');
        var imgEl = document.createElement('img');
        cardEl.classList.add('card');
        windEl.classList.add('card-text');
        humidityEl.classList.add('card-text');
        tempEl.classList.add('card-text');
        humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
        tempEl.textContent = `Temperature: ${data.main.temp} °F`;
        cardBodyEl.classList.add('card-body');
      
        imgEl.setAttribute(
          'src',
          `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        );

        // Append all the content that we created
        bannerEl.appendChild(imgEl);
        cardBodyEl.appendChild(bannerEl);
        cardBodyEl.appendChild(tempEl);
        cardBodyEl.appendChild(humidityEl);
        cardBodyEl.appendChild(windEl);
        cardEl.appendChild(cardBodyEl);
        todayEl.appendChild(cardEl);

        // Call out our forecast and UV functions
        getDailyForecast(searchValue);
        getUVIndex(data.coord.lat, data.coord.lon);
      });
  }

  // Function to create a new row
  function makeRow(searchValue) {
    // Makes a new `li` element and add classes/text to it
    var liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'list-group-item-action');
    liEl.id = searchValue;
    var text = searchValue;
    liEl.textContent = text;

    // Choses the history element and add an event to it
    liEl.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        searchWeather(e.target.textContent);
      }
    });
    document.getElementById('weatherhistory').appendChild(liEl);
  }

  // Provide existing history
  if (currentHistory && currentHistory.length > 0) {
    currentHistory.forEach((item) => makeRow(item));
  }

  // Function to get a search value.
  function getSearchVal() {
    var searchValue = document.querySelector('#search-value').value;
    if (searchValue) {
      searchWeather(searchValue);
      makeRow(searchValue);
      document.querySelector('#search-value').value = '';
    }
  }

  // Attach getSearchVal function to the search button
  document
    .querySelector('#search-button')
    .addEventListener('click', getSearchVal);
});
