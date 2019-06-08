import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeoService } from './geo.service';
import { NameService } from './name.service';
import { DefaultComponent } from './default.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GeoService, NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
