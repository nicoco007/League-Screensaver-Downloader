import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-asset-groups',
  templateUrl: './asset-groups.component.html',
  styleUrls: ['./asset-groups.component.css']
})
export class AssetGroupsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: Http) {}

  data: Object;

  ngOnInit(): void {
    this.http.get('./assets/data.json')
      .toPromise()
      .then(response => this.data = response.json());
  }

  translate(msgid: string): string {
    return this.data['locale']['translations'][this.data['locale']['fallbackLocale']][msgid];
  }
}
