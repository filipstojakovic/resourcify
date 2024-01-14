import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../page/home/home.component';
import {ResourceComponent} from '../page/resource/resource.component';
import {canActivateFn} from '../auth/canActivateFn';
import {Paths} from '../constants/paths';
import {AuthService} from "../service/auth.service";
import {AdminResourceComponent} from "../page/admin-resource/admin-resource.component";
import {ErrorPageComponent} from '../page/error-page/error-page.component';
import {
  AdminResourceReservationComponent,
} from "../page/admin-resource-reservation/admin-resource-reservation.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Paths.HOME,
  },
  {
    path: Paths.HOME,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: HomeComponent,
  },
  {
    path: Paths.RESOURCES_RESERVATION,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: ResourceComponent,
  },
  {
    path: Paths.ADMIN_RESOURCES,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: AdminResourceComponent,
    data: { role: AuthService.ADMIN_ROLE_NAME }, // example of passing role data
  },
  {
    path: Paths.ADMIN_RESOURCES_RESERVATION,
    pathMatch: 'full',
    canActivate: [canActivateFn],
    component: AdminResourceReservationComponent,
    data: { role: AuthService.ADMIN_ROLE_NAME }, // example of passing role data
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
