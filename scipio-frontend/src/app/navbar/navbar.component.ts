import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../keycloak/keycloak.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private keycloak: KeycloakService) {
  }

  ngOnInit() {
  }

  loginKeycloak() {
    this.keycloak.auth.login();
  }

  logoutKeycloak() {
    this.keycloak.auth.redirectUri = document.baseURI;
    this.keycloak.auth.logout();
  }
}
