import {inject, Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public static readonly USERNAME = "preferred_username";
  public static readonly FULL_NAME = "name";

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
    return username ? username : this.keycloak.getKeycloakInstance().tokenParsed[AuthService.USERNAME]
  }

  getId(): string {
    return this.keycloak?.getKeycloakInstance()?.profile?.id as string;
  }

  getFullName() {
    const keycloakInstance = this.keycloak.getKeycloakInstance();

    if (keycloakInstance.tokenParsed && typeof keycloakInstance.tokenParsed === 'object') {
      if (AuthService.FULL_NAME in keycloakInstance.tokenParsed) {
        return keycloakInstance.tokenParsed[AuthService.FULL_NAME];
      }
    }
    return '';
  }

  getTokenExpirationDate(): number {
    const expDate = (this.keycloak.getKeycloakInstance().refreshTokenParsed as { exp: number })['exp'] as number;
    return expDate ? expDate : this.keycloak.getKeycloakInstance().tokenParsed[AuthService.USERNAME]
  }

  refresh(): Observable<any> {
    return from(this.keycloak.getKeycloakInstance().updateToken(1800));
  }

  isExpired(): boolean {
    return this.keycloak.getKeycloakInstance().isTokenExpired();
  }

  logout(): void {
    this.keycloak.logout().then();
  }

  login() {
    this.keycloak.login().then();
  }
}
