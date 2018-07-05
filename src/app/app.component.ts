import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class') public cssClass = '';
  public date;

  constructor() {
    this.date = new Date();
  }
}
