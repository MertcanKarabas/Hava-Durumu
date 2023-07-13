class Weather {

    constructor(sehir, kacGun) {
        this.sehir = sehir;
        this.kacGun = kacGun;
        this.weatherData = null;
    }


    getData() {
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                this.weatherData = JSON.parse(this.responseText);
                console.log(this.weatherData);

                let conditionText = this.weatherData.current.condition.text;
                let sunset = this.weatherData.forecast.forecastday[0].astro.sunset;
                let sunrise = this.weatherData.forecast.forecastday[0].astro.sunrise;
                let locationFromData = `${this.weatherData.location.name}/${this.weatherData.location.region}`;
                let fahrenheitDegree = Math.floor(this.weatherData.current.temp_f);
                let celciusDegree = Math.floor(this.weatherData.current.temp_c);

                degree.innerHTML = celciusDegree
                date.innerHTML = changeDatetoDayAndHour(this.weatherData.current.last_updated);
                detailOfWeather.innerHTML = this.weatherData.current.condition.text;
                loc.innerHTML = locationFromData;


                changeImage(conditionText, sunset, sunrise);
                changeToFahrenheit(fahrenheitDegree);
                changeToCelcius(celciusDegree);

                /*let graph = new Graphic(this.weatherData);
                google.charts.load('current', { packages: ['corechart'] });
                google.charts.setOnLoadCallback(graph.drawChart);*/


            }
        });

        this.kacGun === null ? xhr.open('GET', `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.sehir}&days=1&lang=tr`) :
            xhr.open('GET', `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.sehir}&days=${this.kacGun}&lang=tr`);

        xhr.setRequestHeader('X-RapidAPI-Key', '2c6d1f376amsh976922620b104a4p122d72jsn6cab382e659b');
        xhr.setRequestHeader('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');
        xhr.send(data);
    }

}

function changeToCelcius(celciusDegree) {
    celcius.addEventListener("click", () => {
        degree.textContent = celciusDegree;
        celcius.style.color = "black";
        fahrenheit.style.color = "grey";
    });
}

function changeToFahrenheit(fahrenheitDegree) {
    fahrenheit.addEventListener("click", () => {
        degree.textContent = fahrenheitDegree
        fahrenheit.style.color = "black";
        celcius.style.color = "grey";
    });
}

const daysLong = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const daysShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const ImagesOfWeathersDayTime = new Map([
    ["Güneşli", "ICONS/sunny-3-512.png"],
    ["Bulutlu", "ICONS/cloudy-7-512.png"],
    ["Parçalı Bulutlu", "ICONS/cloudy-sunny-512.png"],
    ["Yağmurlu", "ICONS/rain-16-512.png"],
    ["Şiddetli Yağmur", "ICONS/rain-heavy-512.png"],
    ["Hafif yağmurlu", "ICONS/rain-light-512.png"],
    ["Sağnak Yağışlı", "ICONS/rain-storm-512.png"],
    ["Kısa Süreli Yağmur", "ICONS/shower-3-512.png"],
    ["Sulu Kar", "ICONS/sleet-5-512.png"],
    ["Karlı", "ICONS/snow-15-512.png"],
    ["Şiddetli Kar", "ICONS/snow-heavy-512.png"],
    ["Hafif Karlı", "ICONS/snow-light-512.png"],
    ["Kısa Süreli Kar", "ICONS/snow-shower-1-512.png"],
    ["Gök Gürültülü Dolu", "ICONS/thund-shower-hail-512.png"],
    ["Bölgesel gök gürültülü düzensiz hafif yağmur", "ICONS/thunder-shower-2-512.png"]
]);

const ImagesOfWeathersNight = new Map([
    ["Parçalı Bulutlu", "ICONS/cloudy-sunny-night-512.png"],
    ["Kısa Süreli Yağmur", "ICONS/shower-night-512.png"],
    ["Kısa Süreli Kar", "ICONS/snow-shower-night-512.png"],
    ["Güneşli", "ICONS/sunny-night-512.png"]
]);

function changeDatetoDayAndHour(date) {
    const newDate = new Date(date);
    const dayIndex = newDate.getDay();
    const day = daysLong[dayIndex];
    const hour = newDate.getHours().toString().padStart(2, "0");
    const minute = newDate.getMinutes().toString().padStart(2, "0");
    return `${day} ${hour}:${minute}`;
}

function changeDateToDay(date) {
    const newDate = new Date(date);
    const dayIndex = newDate.getDay();
    const day = daysShort[dayIndex];
    return `${day}`;
}

function changeImage(detailOfWeather, sunset, sunrise) {
    let oldImg = document.querySelector("#imageOfWeather");
    oldImg.remove();
    let tempInfo = document.querySelector(".temperature");
    let tempTempInfo = tempInfo;
    tempInfo.remove();
    let img = document.createElement("img");
    img.id = "imageOfWeather";
    img.alt = "hava durumu";

    let currentDate = new Date();
    let h = currentDate.getHours();
    let m = currentDate.getMinutes();

    let sunriseSplitted = sunrise.split(" ");
    let sunsetSplitted = sunset.split(" ");

    let sunriseTimeSplitted = sunriseSplitted[0].split(":");
    let sunsetTimeSplitted = sunsetSplitted[0].split(":");

    let sunriseHour = parseInt(sunriseTimeSplitted[0]);
    let sunriseMinute = parseInt(sunriseTimeSplitted[1]);

    let sunsetHour = parseInt(sunsetTimeSplitted[0]) + 12;
    let sunsetMinute = parseInt(sunsetTimeSplitted[1]);

    //gündüz vakti
    
    /*if ((h > sunriseHour && h < sunsetHour) || (h == sunriseHour && m > sunriseMinute) || (h == sunsetHour && m < sunsetMinute)) {
        ImagesOfWeathersDayTime.forEach((value, key) => {
            if (detailOfWeather === key) {
                img.src = value;
            }
        });

        //gece vakti
    } else if ((h == sunriseHour && m < sunriseMinute) || (h == sunsetHour && m > sunsetMinute) || (h > sunsetHour) || (h < sunriseHour)) {
        ImagesOfWeathersNight.forEach((key, value) => {
            if (detailOfWeather === key) {
                img.src = value;
            }
        })
    } 
    */

    findImage(sunsetHour, sunriseHour, sunsetMinute, sunriseMinute, h, m, img);
    weatherInfo.appendChild(img);
    weatherInfo.appendChild(tempTempInfo);

}

function findImage(sunsetHour, sunriseHour, sunsetMinute, sunriseMinute, currentHour, currentMinute, img) {
    
    //gündüz vakti
    if ((currentHour > sunriseHour && currentHour < sunsetHour) || (currentHour == sunriseHour && currentMinute > sunriseMinute) || (currentHour == sunsetHour && currentMinute < sunsetMinute)) {
        ImagesOfWeathersDayTime.forEach((value, key) => {
            if (detailOfWeather === key) {
                img.src = value;
            }
        });

    //gece vakti
    } else if ((currentHour == sunriseHour && m < sunriseMinute) || (currentHour == sunsetHour && m > sunsetMinute) || (currentHour > sunsetHour) || (currentHour < sunriseHour)) {
        ImagesOfWeathersNight.forEach((key, value) => {
            if (detailOfWeather === key) {
                img.src = value;
            }
        })
    } else {
        img.src = "ICONS/somethingWrong.png;";
    }
}

function daysOfWeather(detailOfWeather) {
    /*
    <div class="day1 days">
            <h5>Day1</h5>
            <img src="ICONS/sunny-3-512.png" alt="hava durumu">
            <div class="maxMinDegree">
                <p>33°</p>
                <p>23°</p>
            </div>
        </div>
    */

    detailOfWeather.forEach(value => {
        let day = document.createElement("div");
        day.className = `day${value} days`;

        let h5 = document.createElement("h5");
        let img = document.createElement("img");
    });


    img.src
}
