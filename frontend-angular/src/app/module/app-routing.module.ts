import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../page/home/home.component';
import {ResourceComponent} from '../page/resource/resource.component';
import {canActivateFn} from '../auth/canActivateFn';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "home",
  },
  {
    path: 'home',
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: HomeComponent,
    // data: { role: [RoleEnum.admin, RoleEnum.user] } // example of passing role data
  },
  {
    path: 'resource',
    pathMatch: 'full',
    // canActivate: [canActivateFn],
    component: ResourceComponent,
    // data: { role: [RoleEnum.admin, RoleEnum.user] } // example of passing role data
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
