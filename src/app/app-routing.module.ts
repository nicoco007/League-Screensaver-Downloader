import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AssetGroupsComponent} from './asset-groups.component';

const routes: Routes = [
  { path: '', redirectTo: '/assets', pathMatch: 'full' },
  { path: 'assets',  component: AssetGroupsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
