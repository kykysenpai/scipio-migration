package be.mytcc.scipio.model.bdo;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class GuildMember {

    @Id
    @Column(name = "name")
    private String name;

    public GuildMember() {

    }

    public GuildMember(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "GuildMember{" +
                "name='" + name + '\'' +
                '}';
    }
}
