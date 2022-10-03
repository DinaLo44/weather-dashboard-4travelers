var apiKey = 'bdabe8e8600787cd3137c1b4f23667f4';
var listOfCities = document.getElementById('list-of-cities');
var inputEl = document.getElementById('city-input');
var searchButtonEl = document.querySelector('#search-button');
var todaysWeather = document.getElementById('todays-weather');
var cityNameEl = document.querySelector('.city-name');
var dateEl = document.querySelector('.date');
var iconEl = document.querySelector('.icon');
var weatherConditionEl = document.querySelector('.weather-condition');
var temperatureEl = document.querySelector('.temperature');
var humidityEl = document.querySelector('.humidity');
var windSpeedEl = document.querySelector('.wind-speed');
var uviIndexEl = document.querySelector('.uvi-index');
var searchedCity = document.getElementById('searched-city');
var cityNameBtn = document.getElementById('cityname-btn');
var fiveDayForecastContainer = document.getElementById("fiveday-forecast");

//This function is to get the city name, latitude and longitude first to apply it into the one call api for current and forecast weather
function fetchWeather(city) {
    console.log(city)
    /*API call taken from https://openweathermap.org/api/geocoding-api
    EG: https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=1&appid=bdabe8e8600787cd3137c1b4f23667f4 */

    var directGeocodingUrl = ` https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(directGeocodingUrl)
        .then(function (response) {
            console.log(response)
            return response.json()

        }).then(function (data) {

            fiveDayForecastContainer.innerHTML = "";
            var city = data[0].name
            var latitude = data[0].lat
            var longitude = data[0].lon


            //reference: https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}
            var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`;
            // console.log(data.coord.lon)
            // console.log(data.coord.lat)
            fetch(oneCallUrl)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    // var cityTakenFromData = data.name;
                    cityNameEl.textContent = "Weather in " + city;

                    dateEl.textContent = moment.unix(data.current.dt).format('MMMM Do, YYYY');

                    // var icon = data.weather[0].icon;
                    iconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";

                    // var weatherCondition = data.weather[0].description;
                    weatherConditionEl.textContent = data.current.weather[0].description;

                    // var temperature = data.current.temp;
                    temperatureEl.textContent = "Temperature: " + data.current.temp + "°F";

                    // var humidity = data.current.humidity;
                    humidityEl.textContent = "Humidity: " + data.current.humidity + "%";

                    // var windSpeed = data.current.wind_speed;
                    windSpeedEl.textContent = "Wind speed: " + data.current.wind_speed + " miles/hour";

                    // var uviIndex = data.current.uvi;
                    uviIndexEl.textContent = "UVI: " + data.current.uvi;

                    for (var i = 0; i <= 4; i++) {

                        var cardsForEachDay = document.createElement("div");
                        cardsForEachDay.classList.add("styled-cards-forecast");
                        cardsForEachDay.classList.add("col");
                        fiveDayForecastContainer.append(cardsForEachDay);

                        var dateForEachCard = document.createElement("div");
                        var dateFromForecastData = moment.unix(data.daily[i].dt).format('MMMM Do, YYYY');
                        dateForEachCard.textContent = dateFromForecastData;
                        cardsForEachDay.append(dateForEachCard);

                        var iconForEachDay = document.createElement("img");
                        var iconFromForecastData = data.daily[i].weather[0].icon;
                        var iconUrlFromData = "http://openweathermap.org/img/wn/" + iconFromForecastData + "@2x.png";
                        iconForEachDay.setAttribute('src', iconUrlFromData);
                        cardsForEachDay.append(iconForEachDay);

                        var descripForEachDay = document.createElement("p");
                        var descripFromForecastData = data.daily[i].weather[0].description;
                        descripForEachDay.textContent = descripFromForecastData;
                        cardsForEachDay.append(descripForEachDay);

                        var tempForEachDay = document.createElement("p");
                        var tempFromForecastData = data.daily[i].temp.day;
                        tempForEachDay.textContent = "Temperature: " + tempFromForecastData + "°F";
                        cardsForEachDay.append(tempForEachDay);

                        var humidityForEachDay = document.createElement("p");
                        var humidityFromForecastData = data.daily[i].humidity;
                        humidityForEachDay.textContent = "Humidity: " + humidityFromForecastData + "%";
                        cardsForEachDay.append(humidityForEachDay);

                        var windForEachCard = document.createElement("p");
                        var windFromForecastData = data.daily[i].wind_speed;
                        windForEachCard.textContent = "Wind speed " + windFromForecastData + " miles/hour";
                        cardsForEachDay.append(windForEachCard);

                        var uviForEachCard = document.createElement("p");
                        var uviFromForecastData = data.daily[i].uvi;
                        uviForEachCard.textContent = "UVI: " + uviFromForecastData;
                        cardsForEachDay.append(uviForEachCard);

                    }
                })
        })
}

// function searchInfo () {
searchButtonEl.addEventListener("click", function (event) {
    console.log(inputEl.value)
    console.log('this works')
    event.preventDefault();
    console.log(inputEl.value)

    var inputElValue = inputEl.value;
    if (inputElValue === null) {
        alert("Please enter a city name")
    } else {

        fetchWeather(inputElValue);
        renderSearchedCities(inputElValue);
        displayingForecastWeather();
        creatingSearchedCitiesButton();
    }
})


creatingSearchedCitiesButton();
//This function saves the searched cities
function renderSearchedCities(city) {
    var cities = [];

    var lastSearchedCity = JSON.parse(localStorage.getItem("lastSearchedCity"));
    console.log(lastSearchedCity)
    if (localStorage.getItem('lastSearchedCity') === null) {
        cities = [];
    } else {
        cities = lastSearchedCity
    }


    // lastSearchedCity.push(inputElValue.value)

    // cities = JSON.parse(localStorage.getItem(lastSearchedCity));
    cities.push(city)
    // cities.push(lastSearchedCity);

    localStorage.setItem("lastSearchedCity", JSON.stringify(cities));

}

var searchingBtn;
function creatingSearchedCitiesButton() {
    if (localStorage.getItem('lastSearchedCity') !== null) {
        cities = JSON.parse(localStorage.getItem('lastSearchedCity'));
        searchedCity.textContent = "";

        for (var i = 0; i < cities.length; i++) {
            // console.log(lastSearchedCity[i])

            searchingBtn = document.createElement('button');

            searchingBtn.setAttribute("style", "margin: 0.2em")
            var searchedPreviousCity = JSON.parse(localStorage.getItem('lastSearchedCity'))[i];

            searchingBtn.textContent += searchedPreviousCity;

            searchedCity.append(searchingBtn);
            displayingForecastWeather();
        }
    }
}


function displayingForecastWeather() {
    searchingBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (searchingBtn) {
            todaysWeather.textContent = "";
            fiveDayForecastContainer.textContent = "";
            fetchWeather(event.target.textContent);
        }

    })
};

function buttonsStay() {
    if (localStorage === null) {

    } else {
        creatingSearchedCitiesButton();
    }
}

