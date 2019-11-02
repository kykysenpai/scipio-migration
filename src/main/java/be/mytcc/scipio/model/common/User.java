package be.mytcc.scipio.model.common;

import be.mytcc.scipio.model.communistSplit.CommunistSplitGroup;
import be.mytcc.scipio.model.spotify.AlbumReleaseSubscription;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
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

    @Column(name = "discord_id")
    private String discordId;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private Set<CommunistSplitGroup> communistSplitGroups;

    @ManyToMany(mappedBy = "usersToNotify")
    @JsonIgnore
    private Set<AlbumReleaseSubscription> subscriptions;

    public User() {
        communistSplitGroups = new HashSet<>();
        subscriptions = new HashSet<>();
    }

    public User(String keycloakId, String email, String username, String firstname, String surname, String discordId) {
        this();
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

    public Set<CommunistSplitGroup> getCommunistSplitGroups() {
        return communistSplitGroups;
    }

    public void setCommunistSplitGroups(Set<CommunistSplitGroup> communistSplitGroups) {
        this.communistSplitGroups = communistSplitGroups;
    }

    public Set<AlbumReleaseSubscription> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(Set<AlbumReleaseSubscription> subscriptions) {
        this.subscriptions = subscriptions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return keycloakId.equals(user.keycloakId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(keycloakId);
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
