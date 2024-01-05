import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment.development";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root',
})
export class KeycloakHttpInterceptorService implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService, private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.keycloakService.getKeycloakInstance().authenticated) {
      console.log("keycloak-http-interceptor.service.ts > intercept(): " + "not authenticated");
      this.keycloakService.getKeycloakInstance().clearToken();
      this.authService.logout();
    }
    const apiReq = request.clone({
      url: `${environment.baseUrl}/${request.url}`,
      setHeaders: {
        Authorization: "Bearer " + this.keycloakService.getKeycloakInstance().token,
      },
    });
    return next.handle(apiReq);
    // return next.handle(apiReq).pipe( tap(() => {},
    //   (err: any) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status !== 401) {
    //         return;
    //       }
    //       this.keycloakService.getKeycloakInstance().clearToken();
    //       this.authService.logout();
    //     }
    //   }));
  }
}
