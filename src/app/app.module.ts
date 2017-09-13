import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AssetGroupsComponent} from './asset-groups.component';
// import {AppRoutingModule} from './app-routing.module';

import {TagFilterPipe} from './tag-filter.pipe';

import {DataService} from './data.service';
import {TranslationSortPipe} from './translation-sort.pipe';

@NgModule({
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AssetGroupsComponent,
    TagFilterPipe,
    TranslationSortPipe
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
