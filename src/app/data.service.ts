import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {
  private data: Object;
  private locale = 'en_US';

  constructor(private http: HttpClient) {}

  loadData(): Promise<void | Object> {
    return this.http.get('https://nicoco007.com/screensaver/screensavers.riotgames.com/v2/latest/content/data.json')
      .toPromise()
      .then(response => {
        this.data = response;
        return Promise.resolve(this.data);
      }).catch(reason => {
        // TODO: modal
      });
  }

  getData(): Object {
    return this.data;
  }

  translate(msgid: string): string {
    if (this.data['locale']['translations'][this.locale]) {
      return this.data['locale']['translations'][this.locale][msgid];
    } else {
      return this.data['locale']['translations'][this.data['locale']['fallbackLocale']][msgid];
    }
  }
}
