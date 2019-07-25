package be.mytcc.scipio.model.common;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    private String keycloak_id;

    public String getKeycloak_id() {
        return keycloak_id;
    }

    public void setKeycloak_id(String keycloak_id) {
        this.keycloak_id = keycloak_id;
    }
}
