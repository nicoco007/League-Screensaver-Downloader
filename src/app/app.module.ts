import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AssetGroupsComponent} from './asset-groups.component';
import {AppRoutingModule} from './app-routing.module';

import {TagFilterPipe} from './tag-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    AssetGroupsComponent,
    TagFilterPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
