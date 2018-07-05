import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as FileSaver from 'file-saver';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  private data: Object;
  private locale = 'en_US';

  constructor(private http: HttpClient) {}

  download(assetPath): void {
    const blah = assetPath.split('/');
    const assetName = blah[blah.length - 1];

    this.http.get('https://screensaver.riotgames.com/v2/latest/content/' + assetPath, {responseType: 'blob'}).toPromise()
      .then(response => {
        FileSaver.saveAs(new Blob([response]), assetName, true);
      }).catch(reason => {
        // TODO: modal
      });
  }

  loadData(): Promise<void | Object> {
    return this.http.get('https://nicoco007.com/screensaver/data.php')
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
