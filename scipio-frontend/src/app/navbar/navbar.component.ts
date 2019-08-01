import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../keycloak/keycloak.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public keycloak: KeycloakService) {
  }

  ngOnInit() {
  }

  loginKeycloak() {
    this.keycloak.auth.redirectUri = document.baseURI;
    this.keycloak.auth.login();
  }

  logoutKeycloak() {
    this.keycloak.auth.redirectUri = document.baseURI;
    this.keycloak.auth.logout();
  }

  getProfileUrl() {
    return environment.keycloakRootUrl + "/realms/" + environment.realm + "/account";
  }
}
