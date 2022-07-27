var apiKey = 'bdabe8e8600787cd3137c1b4f23667f4';
var listOfCities = document.querySelector('ul');
// variables for HTML elements 
var inputEl = document.getElementById('city-input');
var searchButtonEl = document.querySelector('.search-button');
var cityNameEl = document.querySelector('.city-weather');
var dateEl = document.querySelector('.date');
var iconEl = document.querySelector('.icon');
var weatherConditionEl = document.querySelector('.weather-condition');
var temperatureEl = document.querySelector('.temperature');
var humidityEl = document.querySelector('.humidity');
var windSpeedEl = document.querySelector('.wind-speed');

// store missing UVI data in this variable



//this function fetches the Current and Forecast Weather APIs
function getApiWeather(city) {
    // console.log(city)
    //url reference: 'https://api.openweathermap.org/data/2.5/weather?q=Denver&units=metric&appid=bdabe8e8600787cd3137c1b4f23667f4'
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    // fetch all weather information except for UVI data
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(async function (data) {
            console.log('The first data object is', data);

            //This url catches the UVI data
            var longitude = data.coord.lon
            var latitude = data.coord.lat
            var uviUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}`
            console.log(data.coord.lon)
            console.log(data.coord.lat)

            var uviUrlFetch = await fetch(uviUrl)
                .then(function (response) {

                    console.log(data)
                    console.log('The second data object is', data);
                    return response.json();

                }).then(function (data) {
                    return data;

                })
            console.log(uviUrlFetch)

            missingUviData = uviUrlFetch.current.uvi;
            console.log(missingUviData)
            renderInfoWeather(data, missingUviData)
            
        })
        

}


//This function displays the information in the corresponding HTML element
function renderInfoWeather(data, missingUviData) {
    console.log(missingUviData)
    var cityName = data.name;
    var weatherCondition = data.weather[0].description;
    var icon = data.weather[0].icon;
    var temperature = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var uviIndexEl = document.querySelector('.uvi-index');
    console.log(cityName, weatherCondition, icon, temperature, humidity, windSpeed)
    cityNameEl.innerHTML = "Weather in " + cityName;
    dateEl.innerText = moment().format('MMMM Do, YYYY');
    iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    weatherConditionEl.innerText = weatherCondition;
    temperatureEl.innerText = "Temperature: " + temperature + '°F';
    humidityEl.innerText = "Humidity: " + humidity + "%";
    windSpeedEl.innerText = "Wind speed: " + windSpeed + " miles/hour";
    uviIndexEl.innerText = 'UVI: ' + missingUviData;
    for (var i = 0; i < data.length; i++) {
        var searchedCities = document.createElement('li');
        searchedCities.textContent = data[i].html_url
        listOfCities.appendChild(searchedCities);
    }


}

//This function captures the name of the city the user inputs and calls all APIs funcitons
function searchInfo(e) {
    // prevent the automatic refresh of the browser page
    e.preventDefault()
    // console.log('searchInfo');
    var inputElValue = inputEl.value;
    getApiWeather(inputElValue);
    getApiForecast(inputElValue);
    
}



//Function to fetch the 5-day forecast
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//Eg: https://api.openweathermap.org/data/2.5/forecast?q=Denver&units=imperial&appid=bdabe8e8600787cd3137c1b4f23667f4
function getApiForecast(city) {
    var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(urlForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {
            console.log('Your forecast data is', forecastData);
            
        //Function to display the 5-Day forecast
        function renderForecast(forecastData) {
            
            console.log(forecastData)
            // console.log(forecastData.length)
            for (var i = 0; i < forecastData.length; i++) {
        
                var div1 = document.createElement('div');
                div1.classList.add('card');
        
                var div2 = document.createElement('div');
                div2.classList.add('weather-info');
        
                var h2El = document.createElement('h2');
                h2El.classList.add('city-weather');
        
                var h3El1 = document.createElement('h3');
                h3El1.classList.add('date');
        
                var imgEl = document.createElement('img');
                imgEl.classList.add('icon');
        
                var h3El2 = document.createElement('h3');
                h3El2.classList.add('weather-condition');
        
                var h3El3 = document.createElement('h3');
                h3El3.classList.add('temperature');
        
                var h3El4 = document.createElement('h3');
                h3El4.classList.add('humidity');
        
                var h3El5 = document.createElement('h3');
                h3El5.classList.add('wind-speed');
                // h3El5.innerText = windSpeedForecast;
                // console.log(h3El5)
        
                // var h3El6 = document.createElement('h3');
                // h3El6.classList.add('uv-index');
                // h3El6.textContent = 'This is a text item'
        
        
                var cityNameForecast = forecastData.city.name;
                var weatherConditionForecast = forecastData.weather[0].description;
                var iconForecast = forecastData.weather[0].icon;
                var temperatureForecast = forecastData.main.temp;
                var humidityForecast = forecastData.main.humidity;
                var windSpeedForecast = forecastData.wind.speed;
                
                console.log(cityNameForecast, weatherConditionForecast, iconForecast, temperatureForecast, humidityForecast, windSpeedForecast)
        
                cityNameEl.innerText = "Weather in " + cityName;
                dateEl.innerText = moment().format('MMMM Do, YYYY');
                iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                weatherConditionEl.innerText = weatherCondition;
                temperatureEl.innerText = "Temperature: " + temperature + '°F';
                humidityEl.innerText = "Humidity: " + humidity + "%";
                windSpeedEl.innerText = "Wind speed: " + windSpeed + " miles/hour";
                uviIndexEl.innerText = 'UVI: ' + missingUviData;
            } 
        
        } renderForecast(forecastData)
    })}






searchButtonEl.addEventListener('click', searchInfo);

// searchButtonEl.addEventListener('click', getApiForecast);

