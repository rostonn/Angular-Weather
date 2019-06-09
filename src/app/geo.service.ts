import { Injectable, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class GeoService implements OnInit {
    geo: any = "";
    errorMessage = '';
    city = {};
    weather = {};
    constructor(private http: HttpClient) { }

    getGeo() {
        return this.geo;
    }

    
    getPosition(): Observable<Object> {
        return Observable.create(observer => {
            navigator.geolocation.watchPosition((pos: Position) => {
                this.geo = pos.coords;
                observer.next(pos.coords);
            }, 
            
            (error) => {
                observer.error(error);
                throw error;
            },
            {   
                enableHighAccuracy: true
            }
            )
                
        });
    }
    getCity(geo): Observable<Object> {
        let url = environment.geoUrl + environment.geoKey + "&location=" + geo.latitude + "," + geo.longitude

        return this.http.get(url).pipe(map((response: any) => {
            return response;
        }));
    }
    getWeather(zipCode): Observable<Object> {
        let url = environment.weatherUrl + zipCode + ",us&appid=" + environment.weatherKey;

        return this.http.get(url).pipe(map((response: any) => {
            return response;
        }));
    }

    // getPos() {
    //     this.getPosition()
    //         .subscribe(
    //             pos => {
    //                 this.geo = pos
    //             },
    //             error => this.errorMessage = <any>error
    //         )
    // }

    ngOnInit() {
        // this.getPos();
    }
}
