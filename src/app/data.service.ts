import {Injectable} from '@angular/core';
import {Http, ResponseContentType} from '@angular/http';
import * as FileSaver from 'file-saver';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  private data: Object;
  private locale = 'en_US';

  constructor(private http: Http) {}

  download(assetPath): void {
    const blah = assetPath.split('/');
    const assetName = blah[blah.length - 1];

    this.http.get('https://screensaver.riotgames.com/v2/latest/content/' + assetPath, {responseType: ResponseContentType.Blob}).toPromise()
      .then(response => {
        FileSaver.saveAs(new Blob([response.blob()]), assetName, true);
      }).catch(reason => {
        // TODO: modal
      });
  }

  loadData(): Promise<Object> {
    // return this.http.get('https://content.nicoco007.com/lolwd/data.php')
    return this.http.get('https://screensaver.riotgames.com/v2/latest/content/data.json')
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
    if (this.data['locale']['translations'][this.locale]) {
      return this.data['locale']['translations'][this.locale][msgid];
    } else {
      return this.data['locale']['translations'][this.data['locale']['fallbackLocale']][msgid];
    }
  }
}
