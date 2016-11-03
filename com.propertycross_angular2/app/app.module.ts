
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { PropertyComponent }   from './property.component';
import { PropertyService }   from './property.service';
//import { RouterModule } from '@angular/router';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,  
   /* RouterModule.forRoot([
      {
        path: 'property/:name_loaction',
        component: PropertyComponent
      },
      {
         path: 'property',
         component: PropertyComponent       
      },
      {
        path: '',
        component: AppComponent 
      }
    ]) */   
  ],
  declarations: [ 
    AppComponent, 
    PropertyComponent 
  ],

  bootstrap:    [ AppComponent ],
  providers: [ PropertyService ]
})


export class AppModule { }