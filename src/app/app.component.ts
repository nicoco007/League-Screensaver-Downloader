import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class') public cssClass = '';
}
