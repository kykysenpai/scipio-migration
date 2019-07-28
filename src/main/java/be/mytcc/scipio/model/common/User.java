package be.mytcc.scipio.model.common;

import be.mytcc.scipio.model.communistSplit.CommunistSplitGroup;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Entity
public class User {

    @Id
    private String keycloakId;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "surname")
    private String surname;

    @Column(name= "discord_id")
    private String discordId;

    @ManyToMany(mappedBy = "users")
    private Set<CommunistSplitGroup> communistSplitGroups;

    public User() {
    }

    public User(String keycloakId, String email, String username, String firstname, String surname, String discordId) {
        this.keycloakId = keycloakId;
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.surname = surname;
        this.discordId = discordId;
    }

    public String getKeycloakId() {
        return keycloakId;
    }

    public void setKeycloakId(String keycloakId) {
        this.keycloakId = keycloakId;
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

    public String getDiscordId() {
        return discordId;
    }

    public void setDiscordId(String discordId) {
        this.discordId = discordId;
    }

    @Override
    public String toString() {
        return "User{" +
                "keycloakId='" + keycloakId + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", surname='" + surname + '\'' +
                ", discordId='" + discordId + '\'' +
                '}';
    }
}
