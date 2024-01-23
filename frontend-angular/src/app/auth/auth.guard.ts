import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {AuthService} from '../service/auth.service';
import {Paths} from '../constants/paths';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
      protected override readonly router: Router,
      private readonly keycloakService: KeycloakService,
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const keycloak = this.keycloakService.getKeycloakInstance();
    const isAuthenticated = keycloak.authenticated;
    if (!isAuthenticated) {
      await this.keycloakService.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data['role'];
    if (requiredRoles == null)
      return true;

    const hasRequiredRole = keycloak.hasResourceRole(requiredRoles, AuthService.KEYCLOAK_CLIENT_NAME)

    if (!hasRequiredRole) {
      await this.router.navigate([Paths.RESOURCES]);
      return false;
    }

    return true;
  }

}
