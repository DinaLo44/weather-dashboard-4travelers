var apiWeather = {
    apiKey : 'bdabe8e8600787cd3137c1b4f23667f4',
    // url : 'https://api.openweathermap.org/data/2.5/weather?q=Denver&units=metric&appid=bdabe8e8600787cd3137c1b4f23667f4',
    info : function (city) {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        fetch(url)
        .then(function (response) {
            return response.json()
            .then(function(data) {
                console.log(this.renderInfoWeather(data));
            })
           
        })
    }
}

function renderInfoWeather (data) {
var cityName = data.name;
var description = data.weather[0].description;
var icon = data.weather[0].icon;
var temperature = data.main.temp;
var humidity = data.main.humidity;
var windSpeed = data.wind.speed;
console.log(cityName,description,icon,temperature,humidity,windSpeed)

}