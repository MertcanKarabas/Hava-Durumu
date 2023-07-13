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
                let forecastdays = this.weatherData.forecast.forecastday;
                degree.innerHTML = celciusDegree
                date.innerHTML = changeDatetoDayAndHour(this.weatherData.current.last_updated);
                detailOfWeather.innerHTML = this.weatherData.current.condition.text;
                loc.innerHTML = locationFromData;

                changeImage(conditionText, sunset, sunrise);
                changeToFahrenheit(fahrenheitDegree, forecastdays);
                changeToCelcius(celciusDegree, forecastdays);
                daysOfWeather(forecastdays, 0);
                changeMainDate();
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

function changeToCelcius(celciusDegree, detailOfWeather) {
    celcius.addEventListener("click", () => {
        degree.textContent = celciusDegree;
        celcius.style.color = "black";
        fahrenheit.style.color = "grey";
        daysOfWeather(detailOfWeather, 0);
    });
}   

function changeToFahrenheit(fahrenheitDegree, detailOfWeather) {
    fahrenheit.addEventListener("click", () => {
        degree.textContent = fahrenheitDegree
        fahrenheit.style.color = "black";
        celcius.style.color = "grey";
        daysOfWeather(detailOfWeather, 1);
    });
}

const daysLong = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const daysShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const ImagesOfWeathersDayTime = new Map([
    ["Açık", "ICONS/sunny-3-512.png"],
    ["Güneşli", "ICONS/sunny-3-512.png"],
    ["Bulutlu", "ICONS/cloudy-7-512.png"],
    ["Parçalı Bulutlu", "ICONS/cloudy-sunny-512.png"],
    ["Orta kuvvetli yağmurlu", "ICONS/rain-16-512.png"],
    ["Şiddetli Yağmur", "ICONS/rain-heavy-512.png"],
    ["Hafif yağmurlu", "ICONS/rain-light-512.png"],
    ["Sağnak Yağışlı", "ICONS/rain-storm-512.png"],
    ["Bölgesel düzensiz yağmur yağışlı", "ICONS/shower-3-512.png"],
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
    ["Bölgesel düzensiz yağmur yağışlı", "ICONS/shower-night-512.png"],
    ["Kısa Süreli Kar", "ICONS/snow-shower-night-512.png"],
    ["Açık", "ICONS/sunny-night-512.png"],
    ["Güneşli", "ICONS/sunny-3-512.png"]
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
    let currentHour = currentDate.getHours();
    let currentMinute = currentDate.getMinutes();

    let sunriseSplitted = sunrise.split(" ");
    let sunsetSplitted = sunset.split(" ");

    let sunriseTimeSplitted = sunriseSplitted[0].split(":");
    let sunsetTimeSplitted = sunsetSplitted[0].split(":");

    let sunriseHour = parseInt(sunriseTimeSplitted[0]);
    let sunriseMinute = parseInt(sunriseTimeSplitted[1]);

    let sunsetHour = parseInt(sunsetTimeSplitted[0]) + 12;
    let sunsetMinute = parseInt(sunsetTimeSplitted[1]);

    findImage(detailOfWeather, sunsetHour, sunriseHour, sunsetMinute, sunriseMinute, currentHour, currentMinute, img);
    weatherInfo.appendChild(img);
    weatherInfo.appendChild(tempTempInfo);

}

function findImage(detailOfWeather, sunsetHour, sunriseHour, sunsetMinute, sunriseMinute, currentHour, currentMinute, img) {
    //gündüz vakti
    if ((currentHour > sunriseHour && currentHour < sunsetHour) || (currentHour == sunriseHour && currentMinute > sunriseMinute) || (currentHour == sunsetHour && currentMinute < sunsetMinute)) {
        ImagesOfWeathersDayTime.forEach((value, key) => {
            if (detailOfWeather === key) {
                img.src = value;
            }
        });

        //gece vakti
    } else if ((currentHour == sunriseHour && currentMinute < sunriseMinute) || (currentHour == sunsetHour && currentMinute > sunsetMinute) || (currentHour > sunsetHour) || (currentHour < sunriseHour)) {
        ImagesOfWeathersNight.forEach((value, key) => {
            if (detailOfWeather === key) {
                img.src = value;
            }
        })
    } else {
        img.src = "ICONS/somethingWrong.png;";
    }

}

function daysOfWeather(detailOfWeather, typeOfDegree) {

    let days = Array.from(threeDaysOfWeather.children);
    days.forEach(value => {
        value.remove();
    });


    let mainDiv = document.querySelector("#threeDaysWeather");
    detailOfWeather.forEach((value, index) => {
        let maxTemp;
        let minTemp;

        if (typeOfDegree === 0) {
            maxTemp = Math.floor(value.day.maxtemp_c);
            minTemp = Math.floor(value.day.mintemp_c);
        } else {
            maxTemp = Math.floor(value.day.maxtemp_f);
            minTemp = Math.floor(value.day.mintemp_f);
        }


        let detailOfWeather = value.day.condition.text;
        let sunset = value.astro.sunset;
        let sunrise = value.astro.sunrise;

        let div = document.createElement("div");
        div.className = `day${index} days`;

        let h5 = document.createElement("h5");
        h5.className = "day";
        h5.textContent = changeDateToDay(value.date);

        let img = document.createElement("img");
        img.className = "imageDayOfWeather";

        let currentDate = new Date();
        let currentHour = currentDate.getHours();
        let currentMinute = currentDate.getMinutes();

        let sunriseSplitted = sunrise.split(" ");
        let sunsetSplitted = sunset.split(" ");

        let sunriseTimeSplitted = sunriseSplitted[0].split(":");
        let sunsetTimeSplitted = sunsetSplitted[0].split(":");

        let sunriseHour = parseInt(sunriseTimeSplitted[0]);
        let sunriseMinute = parseInt(sunriseTimeSplitted[1]);

        let sunsetHour = parseInt(sunsetTimeSplitted[0]) + 12;
        let sunsetMinute = parseInt(sunsetTimeSplitted[1]);

        findImage(detailOfWeather, sunsetHour, sunriseHour, sunsetMinute, sunriseMinute, currentHour, currentMinute, img);

        let div2 = document.createElement("div");
        div2.className = "maxMinDegree";

        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        p1.className = "degreeOfDay";
        p2.className = "degreeOfDay";
        p1.textContent = maxTemp + "°";
        p2.textContent = minTemp + "°";

        div2.appendChild(p1);
        div2.appendChild(p2);

        div.appendChild(h5);
        div.appendChild(img);
        div.appendChild(div2);

        mainDiv.appendChild(div);
    });
}

function changeMainDate() {
    threeDaysOfWeather.addEventListener("click", (e) => {
        targetClassName = e.target.className;
        let parentDiv, parentDivArray, target;
        if(targetClassName === "day0 days" || targetClassName === "day1 days" || targetClassName === "day2 days") {
            parentDiv = e.target.parentElement;
            target = e.target;
            parentDivArray = Array.from(parentDiv.children);
            parentDivArray.forEach( (value) => {
                value.style.backgroundColor = "#ffffff";
            });
            target.style.backgroundColor = "#fff0f0";

        } else if(targetClassName === "maxMinDegree" || targetClassName === "imageDayOfWeather" || targetClassName === "day") {
            parentDiv = e.target.parentElement.parentElement;
            target = e.target.parentElement;
            parentDivArray = Array.from(parentDiv.children);
            parentDivArray.forEach( (value) => {
                value.style.backgroundColor = "#ffffff";
            });
            target.style.backgroundColor = "#fff0f0";

        } else if(targetClassName === "degreeOfDay") {
            parentDiv = e.target.parentElement.parentElement.parentElement;
            target = e.target.parentElement.parentElement
            parentDivArray = Array.from(parentDiv.children);
            parentDivArray.forEach( (value) => {
                value.style.backgroundColor = "#ffffff";
            });
            target.style.backgroundColor = "#fff0f0";
        }
});
}