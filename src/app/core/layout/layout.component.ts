import { Component } from '@angular/core';


@Component({
  selector: 'app-private-layout',
  template: '<app-nav></app-nav>'
})
export class PrivateLayoutComponent { }


@Component({
  selector: 'app-layout',
  template: '<router-outlet></router-outlet>'
})
export class LayoutComponent { }
