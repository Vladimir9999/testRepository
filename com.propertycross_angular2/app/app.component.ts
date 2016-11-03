import { Component, Input } from '@angular/core';




//styleUrls: ['./app.component.css']
@Component({
  moduleId: module.id,
  selector: 'appComponent',
  templateUrl: 'appComponent.html'
})

export class AppComponent {

  location1: String = '';

  getLocation(location){
    this.location1 = location;
    
  }
}
