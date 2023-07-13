class Location {
    constructor() {
        this.latitude = null;
        this.longitude = null;
        this.state = null;
    }

    getCoords(currentLocation) {
        let weather;
        if (currentLocation != null || currentLocation != undefined) {
            this.state = currentLocation;
            weather = new Weather(this.state, "3");
            weather.getData();
        } else {
            const successCallback = (position) => {
                console.log(position);
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;

                const api_key = "2426acadc5ed47ada855dc787b38e495";
                const url = `https://api.opencagedata.com/geocode/v1/json?q=${this.latitude}+${this.longitude}&key=${api_key}`;

                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        this.state = result.results[0].components.state;
                        let weather = new Weather(this.state, "3");
                        weather.getData();
                        

                    });

            };
            const errorCallback = (error) => {
                console.log(error);
            };

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }



    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }




}