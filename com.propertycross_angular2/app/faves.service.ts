import {Injectable} from '@angular/core';
import {PropertyService} from './property.service'

@Injectable()
export class FavesService {
    constructor(private _propService: PropertyService) {
    }

    getFavesList() {
        return this._propService.getFavesProperty();
    }
}