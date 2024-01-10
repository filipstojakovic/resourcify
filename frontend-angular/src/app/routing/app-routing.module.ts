import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../page/home/home.component';
import {ResourceComponent} from '../page/resource/resource.component';
import {canActivateFn} from '../auth/canActivateFn';
import {paths} from '../constants/paths';
import {AuthService} from "../service/auth.service";
import {AdminResourceComponent} from "../page/admin-resource/admin-resource.component";

export const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: paths.HOME,
  },
  {
    path: paths.HOME,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: HomeComponent,
  },
  {
    path: paths.RESOURCES_RESERVATION,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: ResourceComponent,
  },
  {
    path: paths.ADMIN_RESOURCES,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: AdminResourceComponent,
    data: {role: AuthService.ADMIN_ROLE_NAME}, // example of passing role data
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
