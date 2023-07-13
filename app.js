
const weatherInfo = document.querySelector(".weather-info");
const date = document.querySelector("#date");
const detailOfWeather = document.querySelector("#detailOfWeather");
const degree = document.querySelector("#degree");
const celcius = document.querySelector("#celcius");
const fahrenheit = document.querySelector("#fahrenheit");
const loc = document.querySelector("#location");
const girisBtn = document.querySelector("#girisBtn");
const input = document.querySelector("#inputOfRegion");
const threeDaysOfWeather = document.querySelector("#threeDaysWeather");


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




