class Graphic {

    constructor(weatherData) {
        this.data = null;
        this.options = null;
        this.weatherData = weatherData;
    }
    
    drawChart() {
        // Draw
        let currentDate = new Date();
        let h = currentDate.getHours();
        let firstDayHours = this.weatherData.forecast.forecastday[0].hour;
        let secondDayHours = this.weatherData.forecast.forecastday[1].hour;

        let array = [];

        let time, temp;
        let totalTime = 0;
        firstDayHours.forEach(value => {
            time = firstDayHours[value].time.split(" ");
            temp = Math.floor(firstDayHours[value].temp_c);
            if (value > (h - 3) && value <= 23) {
                totalTime++;
                array.push(time, temp);
            }
        });

        secondDayHours.forEach(value => {
            time = firstDayHours[value].time.split(" ");
            temp = Math.floor(firstDayHours[value].temp_c);

            if (totalTime < 24) {
                totalTime++;
                array.push(time, temp);
            }
        });

        /*google.visualization.arrayToDataTable([
            ['Price', 'Size'],
            [50, 7], [60, 8], [70, 8], [80, 9], [90, 9],
            [100, 9], [110, 10], [120, 11],
            [130, 14], [140, 14], [150, 15]
        ]);*/

        google.visualization.arrayToDataTable(array);

        options = {
            title: 'Sıcaklık',
            hAxis: { title: 'Saatler' },
            legend: 'none'
        };
        const chart = new google.visualization.LineChart(document.querySelector('#graphic'));
        chart.draw(this.data, this.options);
    }

}
