import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <nav>
    <img (click)="toggleMenu()" src="/assets/img/menu.svg"/>
    <h1 id="title">City Weather</h1>

  </nav>
  <ul *ngIf="showMenu">
    <li>
      <a (click)="toggleMenu()" [routerLink]="['/']" class="menu"><span>Home</span>
      </a>
    </li>
    <li>
      <a (click)="toggleMenu()" [routerLink]="['/settings']" class="menu">
          <span>Settings</span>
      </a>
    </li>
  </ul>
  <div (click)="turnOff()">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Weather';

  showMenu: boolean = false;
  toggleMenu() {
    if (this.showMenu) {
      this.showMenu = false;
    }
    else {
      this.showMenu = true;
    }
  }
  turnOff() {
    if (this.showMenu) {
      this.showMenu = false;
    }
  }
}
