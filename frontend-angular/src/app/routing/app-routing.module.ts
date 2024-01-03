import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../page/home/home.component';
import {ResourceComponent} from '../page/resource/resource.component';
import {canActivateFn} from '../auth/canActivateFn';
import {paths} from '../constants/paths';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: paths.HOME,
  },
  {
    path: paths.HOME,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: HomeComponent,
    // data: { role: [RoleEnum.admin, RoleEnum.user] } // example of passing role data
  },
  {
    path: paths.RESOURCES,
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
