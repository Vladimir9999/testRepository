import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {PropertyService} from './property.service';
import { ActivatedRoute, Params }   from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'propList',
    templateUrl: './templates/property.component.html',
    inputs: ['tmp']

})
export class PropertyComponent implements OnChanges, OnInit {

    private property;
    private OneProperty;
    private name_location: string;
    private tmp: String;
    private prop_visible_flag = true;

    constructor(
        private _propertyService: PropertyService, 
        private route: ActivatedRoute
        ) {}

    ngOnChanges() {
        this.OneProperty = undefined;
        if (this.tmp) {
            this.name_location = this.tmp.toString();
            this.getProperty(this.tmp, '1');
        }

    }
    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            let num_page = +params['id'];
            //this.getProperty(this.tmp, num_page);
            //  Добавить в HTML [routerLink]="['/detail', hero.id]"
        });
    }
    getProperty(location, num_page) {
        this._propertyService
            .getProperty(location, num_page)
            .then(property => this.property = property);
    }

    viewOneProperty(prop) {
        this.OneProperty = prop;
        this.prop_visible_flag = false;
    }

    private addFav(prop) {
        this.prop_visible_flag = true;
        this._propertyService.setFavesProperty(prop);
    }
    private goBack(){
        this.prop_visible_flag = true;
    }
}