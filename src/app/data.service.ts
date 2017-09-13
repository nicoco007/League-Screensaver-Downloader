import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  private data: Object;
  private locale = 'fr_FR';

  constructor(private http: Http) {}

  loadData(): Promise<Object> {
    return this.http.get('http://content.nicoco007.com/lolwd/data.php')
      .toPromise()
      .then(response => {
        this.data = response.json();
        return Promise.resolve(this.data);
      }).catch(reason => {
        // TODO: modal
      });
  }

  getData(): Object {
    return this.data;
  }

  translate(msgid: string): string {
    if (this.data['locale']['translations'].hasOwnProperty(this.locale)) {
      return this.data['locale']['translations'][this.locale][msgid];
    } else {
      return this.data['locale']['translations'][this.data['locale']['fallbackLocale']][msgid];
    }
  }
}
