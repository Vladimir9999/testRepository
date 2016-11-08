import { Component, OnInit } from '@angular/core';
import { FavesService } from './faves.service';

@Component({
    selector: 'favesList',
    template: `
        <div *ngIf="faves_prop">
            <h2  class="title">Faves list</h2>
            <ul *ngFor="let val of faves_prop" type="none">
                <li class="propertyCross">
                    <img alt="/img/ico.jpg" src={{val.img_url}}>
                    <div class="textContainer">
                        <div class="price"><span>\${{val.price}}</span></div>
                        <h4>{{val.title}}</h4>
                        <span>bathrooms: {{val.bathroom_number}} bed: {{val.bedroom_number}}</span>
                    </div>
                </li>         
            </ul>       
        </div>    
    `

})
export class FavesComponent {
    private faves_prop = [];

    constructor(private _favesService : FavesService){
        this.getFavesList();   
        console.log(this.faves_prop);
    }
    getFavesList(){
        this.faves_prop = this._favesService.getFavesList();
    }
}