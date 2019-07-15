import { Component, OnInit } from '@angular/core';
// import { DefaultComponent }  from './default.component';
import { NameService } from './name.service';

// import { GeoService } from './geo.service';

@Component({
  template: `
    <input [(ngModel)]="name" (click)="name=''" (keyup)="enterSetName($event)"/>
    <button (click)="setName()">Set Name</button>
    <button (click)="getName()">Show Name</button>
    `
})
export class SettingsComponent {
    name = '';

    constructor(private nameService: NameService){}

    enterSetName(event: any) {
        if(event.key === "Enter") {
            this.setName();
        }
    }

    setName(){
        this.nameService.setName(this.name);
        alert('Your name is ' + this.name);
    }
    getName(){
        let x = this.nameService.getName();
        alert(x)
    }
    ngOnInit(){
        this.name = this.nameService.getName();
    }
 }
