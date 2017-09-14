import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AssetGroupsComponent} from './asset-groups.component';

import {DataService} from './data.service';

import {TagFilterPipe} from './tag-filter.pipe';
import {IdFilterPipe} from './id-filter.pipe';
import {TranslationSortPipe} from './translation-sort.pipe';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AssetGroupsComponent,
    TagFilterPipe,
    IdFilterPipe,
    TranslationSortPipe
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
