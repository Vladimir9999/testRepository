import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Property } from './Property';

@Injectable()
export class PropertyService {
    private property_url = 'http://api.nestoria.com.br/api?encoding=json&pretty=1&action=search_listings&country=br&listing_type=buy&place_name=';
    constructor(private http: Http) {}
    getProperty(location : string): Promise<Property[]>{
        return this.http.get(this.property_url + location)
                    .toPromise()
                    .then(res => res.json().response.listings)                  
                    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}