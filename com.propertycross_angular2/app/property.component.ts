import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { PropertyService } from './property.service';
import { ActivatedRoute } from '@angular/router'


@Component({
    selector: 'propList',
    template: `
        <h2 class="title">Results found for "{{name_location}}" </h2>
        <ul *ngFor="let val of property" type="none">
            <li class="propertyCross">
                <img alt="/img/ico.jpg" src={{val.img_url}}>
                <div class="textContainer">
                    <div class="price"><span>\${{val.price}}</span></div>
                    <h4>{{val.title}}</h4>
                    <span>bathrooms: {{val.bathroom_number}} bed: {{val.bedroom_number}}</span>
                </div>
            </li>         
        </ul>
     
    `,
    inputs: ['tmp']
  
})
export class PropertyComponent implements OnChanges {
    
    property = [];
    name_location: string;
    tmp: String;

    constructor(private _propertyService: PropertyService){}

    ngOnChanges(obj) {
       if (this.tmp) {
           this.name_location = this.tmp.toString();
           this.getProperty(this.tmp);
       }

    }
    getProperty(location){
         console.log("location - " + location);
         this._propertyService
            .getProperty(location)
            .then(property => this.property = property);
    }
}