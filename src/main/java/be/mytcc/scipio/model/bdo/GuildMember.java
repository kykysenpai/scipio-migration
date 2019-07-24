package be.mytcc.scipio.model.bdo;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class GuildMember {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name", unique = true)
    private String name;

    public GuildMember(){

    }

    public GuildMember(long id, String name){
        this.id = id;
        this.name = name;
    }

    public GuildMember(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "GuildMember{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
