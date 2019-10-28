import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container" align="center">
      <router-outlet></router-outlet>
    </div>    `
})
export class AppComponent {}
