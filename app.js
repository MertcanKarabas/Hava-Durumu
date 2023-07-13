/*data = 
{
    "location":{
        "name":"Istanbul",
        "region":"Istanbul",
        "country":"Turkey",
        "lat":41.02,
        "lon":28.96,
        "tz_id":"Europe/Istanbul",
        "localtime_epoch":1689194184,
        "localtime":"2023-07-12 23:36"
    },
    "current":{
        "last_updated_epoch":1689193800,
        "last_updated":"2023-07-12 23:30",
        "temp_c":27.0,
        "temp_f":80.6,
        "is_day":0,
        "condition":{
            "text":"Clear",
            "icon":"//cdn.weatherapi.com/weather/64x64/night/113.png",
            "code":1000},
        "wind_mph":5.6,
        "wind_kph":9.0,
        "wind_degree":50,
        "wind_dir":"NE",
        "pressure_mb":1017.0,
        "pressure_in":30.03,
        "precip_mm":0.0,
        "precip_in":0.0,
        "humidity":58,
        "cloud":0,
        "feelslike_c":27.8,
        "feelslike_f":82.0,
        "vis_km":10.0,
        "vis_miles":6.0,
        "uv":1.0,
        "gust_mph":7.4,
        "gust_kph":11.9
    }
}*/

/*const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});

xhr.open('GET', 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Istanbul&days=5&lang=tr');
xhr.setRequestHeader('X-RapidAPI-Key', '2c6d1f376amsh976922620b104a4p122d72jsn6cab382e659b');
xhr.setRequestHeader('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');

xhr.send(data);

console.log(data); */
const weatherInfo = document.querySelector(".weather-info");
const date = document.querySelector("#date");
const detailOfWeather = document.querySelector("#detailOfWeather");
const degree = document.querySelector("#degree");
const celcius = document.querySelector("#celcius");
const fahrenheit = document.querySelector("#fahrenheit");
const loc = document.querySelector("#location");
const girisBtn = document.querySelector("#girisBtn");
const input = document.querySelector("#inputOfRegion");


let weather, currentLocation;
currentLocation = new Location();
currentLocation.getCoords();

girisBtn.addEventListener("click", () => {
    if(input.value === null || input.value === "" || input.value === undefined) {
        alert("Lütfen input alanını boş bırakmadan girmeyiniz.");
    } else {
        currentLocation.getCoords(input.value);
    }
    
});




