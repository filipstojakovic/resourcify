import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment.development';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
      keycloak.init({
        config: {
          url: `http://keycloak:${environment.authServerPort}`,
          realm: environment.realm,
          clientId: environment.clientId,

        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: true,
          checkLoginIframeInterval: 1000
        },
      });
}
