import { Component, OnInit, Input } from '@angular/core';
import { GeoService } from './geo.service';
import * as moment from 'moment';
import { NameService } from './name.service';

@Component({
    selector: 'my-app',
    templateUrl: 'default.component.html',
    styleUrls: ['app.component.css']
})

export class DefaultComponent implements OnInit {
    title = 'City Weather App';
    error = null;
    geo = {};
    errorMessage = '';
    city = {};
    weather = {};
    timeOfDay = '';
    date = moment().format('MMMM Do YYYY, h:mm:ss a');
    testD: any = moment().format('H:mm:ss');
    name = 'Master Debater';
    imageUrl = '';

    setDate() {
        this.date = moment().format('MMMM Do, h:mm a');
        this.testD = moment().format('H');
        this.testD = Number(this.testD);
        if (this.testD >= 12 && this.testD < 17) {
            this.timeOfDay = "Good Afternoon";
            this.imageUrl = "url('/assets/img/afternoon.jpg')";
        }
        else if (this.testD >= 17 && this.testD < 22) {
            this.timeOfDay = "Good Evening";
            this.imageUrl = "url('/assets/img/evening.jpg')";
        }
        else if (this.testD >= 22 || (this.testD >= 0 && this.testD < 4)) {
            this.timeOfDay = "Good Night"
            this.imageUrl = "url('/assets/img/nighttime.jpg')";
        }
        else {
            this.timeOfDay = "Good Morning";
            this.imageUrl = "url('/assets/img/morning.jpg')";
        }
    }

    constructor(private geoService: GeoService, private nameService: NameService) {
        setInterval(() => { this.setDate(); }, 500);
    }

    getPosition() {
        console.log('Getting Position default component');
        this.geoService.getPosition()
            .subscribe(
                pos => {
                    console.log('Position Returned', pos);
                    this.geo = pos
                    this.getCity(pos)
                },
                error => {
                    // this.errorMessage = <any>error
                    console.log('GetPostition Error');
                    console.log(error);
                    this.error = 'GetPosition Error: ' + error.message + ' Please Click info in the address bar, and "Allow Location" to use this site ';
                }
            )
    }

    getCity(geo) {
        this.error = null;
        this.geoService.getCity(geo)
            .subscribe(
                city => {
                    let results = city['results'][0]['locations'][0];

                    this.city['name'] = results['adminArea5'];
                    this.city['state'] = results['adminArea3'];
                    this.city['country'] = results['adminArea1'];
                    this.city['county'] = results['adminArea4'] + " " + results['adminArea4Type'];
                    this.city['zipCode'] = results['postalCode'].split('-')[0];

                    this.getWeather(this.city['zipCode']);
                },
                error => {
                this.errorMessage = <any>error
                    this.error = 'GetCity Error: ' + error.name + " " + error.status + " " + error.statusText;
                    console.log('GetCity Error')
                    console.log(error);
                }
            )
    }

    getWeather(zipCode) {
        this.error = null;
        this.geoService.getWeather(zipCode)
            .subscribe(
                weather => {
                    this.weather['temp'] = ((weather['main']['temp'] - 273.15) * (9 / 5) + 32).toFixed();
                },

                error => {
                this.errorMessage = <any>error
                    this.error = 'GetWeather Error: ' + error.name + " " + error.status + " " + error.statusText;
                    console.log('GetWeather Error')
                    console.log(error);
                }
            )
    }

    getImage() {
        return this.imageUrl;
    }

    ngOnInit() {
        this.getPosition();
        this.geo = this.geoService.getGeo();
        if (this.geo != "") {
            this.getCity(this.geo);
        }
        this.name = this.nameService.getName();
    }
}
