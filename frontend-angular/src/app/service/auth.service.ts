import {inject, Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public static readonly USER_USERNAME = "preferred_username";
  public static readonly USER_FULL_NAME = "name";
  public static readonly ADMIN_ROLE_NAME = "client-admin-role";
  public static readonly KEYCLOAK_CLIENT_NAME = "frontend";


  keycloak = inject(KeycloakService);

  constructor() {
    this.keycloak.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.keycloak.getKeycloakInstance().loadUserProfile();
      }
    });
  }

  getKeycloakInstance() {
    return this.keycloak.getKeycloakInstance();
  }

  getToken(): string {
    return this.keycloak.getKeycloakInstance()?.token as string;
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
    const username = this.keycloak.getKeycloakInstance()?.profile?.username as string;
    return username ? username : this.keycloak.getKeycloakInstance().tokenParsed[AuthService.USER_USERNAME]
  }

  getId(): string {
    return this.keycloak?.getKeycloakInstance()?.profile?.id as string;
  }

  isAdmin(): boolean {
    const keycloakInstance = this.keycloak.getKeycloakInstance();
    const isAdmin = keycloakInstance.hasResourceRole(AuthService.ADMIN_ROLE_NAME, AuthService.KEYCLOAK_CLIENT_NAME);
    return isAdmin;
  }

  getFullName() {
    const keycloakInstance = this.keycloak.getKeycloakInstance();

    if (keycloakInstance.tokenParsed && typeof keycloakInstance.tokenParsed === 'object') {
      if (AuthService.USER_FULL_NAME in keycloakInstance.tokenParsed) {
        return keycloakInstance.tokenParsed[AuthService.USER_FULL_NAME];
      }
    }
    return '';
  }

  getTokenExpirationDate(): number {
    const expDate = (this.keycloak.getKeycloakInstance().refreshTokenParsed as { exp: number })['exp'] as number;
    return expDate ? expDate : this.keycloak.getKeycloakInstance().tokenParsed[AuthService.USER_USERNAME]
  }

  refresh(): Observable<any> {
    return from(this.keycloak.getKeycloakInstance().updateToken(1800));
  }

  isExpired(): boolean {
    return this.keycloak.getKeycloakInstance().isTokenExpired();
  }

  logout(): void {
    this.keycloak.logout("http://localhost:4200").then();
  }

  login() {
    this.keycloak.login().then();
  }
}
