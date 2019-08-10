import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import * as Keycloak from 'keycloak-js';
import {KeycloakInstance} from 'keycloak-js';

@Injectable({providedIn: 'root'})
export class KeycloakService {

  auth: KeycloakInstance;

  constructor() {
    this.auth = Keycloak({
      url: environment.keycloakRootUrl,
      realm: environment.realm,
      clientId: environment.clientId,
      'enable-cors': true,
      'public-client': true
    });
  }

  initialize(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.init({onLoad: 'check-sso'})
        .success(loggedIn => {
          resolve(loggedIn);
        })
        .error(err => {
          console.error(err);
          reject(false);
        });
    });
  }

}
