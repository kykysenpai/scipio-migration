package be.mytcc.scipio.model.common;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    private String keycloak_id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "surname")
    private String surname;

    public User() {
    }

    public User(String keycloak_id, String email, String username, String firstname, String surname) {
        this.keycloak_id = keycloak_id;
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.surname = surname;
    }

    public String getKeycloak_id() {
        return keycloak_id;
    }

    public void setKeycloak_id(String keycloak_id) {
        this.keycloak_id = keycloak_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Override
    public String toString() {
        return "User{" +
                "keycloak_id='" + keycloak_id + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", surname='" + surname + '\'' +
                '}';
    }
}
