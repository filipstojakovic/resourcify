import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
      keycloak.init({
        config: {
          url: `${environment.KEYCLOAK_BASE_URL}:${environment.KEYCLOAK_PORT}`,
          realm: environment.REALM_NAME,
          clientId: environment.CLIENT_ID,

        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: true,
          checkLoginIframeInterval: 1000
        },
      });
}
