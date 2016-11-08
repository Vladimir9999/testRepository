import {Component, Input} from '@angular/core';
import {Router} from '@angular/Router';



@Component({
    moduleId: module.id,
    selector: 'appComponent',
    templateUrl: './templates/appComponent.html'
})

export class AppComponent {

    location: String = '';

    getLocation(name_location) {
        this.location = name_location;
    }

}
