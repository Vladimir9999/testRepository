import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Property} from './Property';

@Injectable()
export class PropertyService {
    private fav_prop = [];
    private property_url = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy';

    constructor(private http : Http) {}

    getProperty(location: string, num_page : string): Promise<Property[]> {
        return this.http.get(this.property_url + '&page=' + num_page + '&place_name=' + location)
            .toPromise()
            .then(res => res.json().response.listings)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    setFavesProperty(prop) {
        this.fav_prop.push(prop);
    }

    getFavesProperty() {
        return this.fav_prop;
    }

}