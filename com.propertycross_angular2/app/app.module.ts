import {HttpModule}    from '@angular/http';
import {FormsModule}   from '@angular/forms';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}   from './app.component';
import {PropertyComponent}   from './property.component';
import {FavesComponent}   from './faves.component';

import {PropertyService}   from './property.service';
import {FavesService}   from './faves.service';

import {RouterModule} from '@angular/router';

// Create config options (see ILocalStorageServiceConfigOptions) for deets:


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: '',
                component: AppComponent
            },
            {
                path: 'faves',
                component: FavesComponent
            },
            {
                path: 'search', 
                component: PropertyComponent
            },            
            {
                path: 'search/:page', 
                component: PropertyComponent
            }            
        ])
    ],

    declarations: [
        AppComponent,
        PropertyComponent,
        FavesComponent
    ],

    bootstrap: [AppComponent],
    providers: [
      PropertyService, 
      FavesService,     
    ]
})


export class AppModule {
}