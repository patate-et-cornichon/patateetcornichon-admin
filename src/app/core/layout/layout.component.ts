import { Component } from '@angular/core';


@Component({
  selector: 'app-private-layout',
  template: '<app-nav *appLayoutWrapper></app-nav>',
})
export class PrivateLayoutComponent {
}


@Component({
  selector: 'app-layout',
  template: '<router-outlet *appLayoutWrapper></router-outlet>',
})
export class LayoutComponent {
}

