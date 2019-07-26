import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from "../keycloak/keycloak.service";

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

  constructor(private keycloak: KeycloakService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.keycloak.auth.token}`
      }
    });

    return next.handle(req);
  }

}
