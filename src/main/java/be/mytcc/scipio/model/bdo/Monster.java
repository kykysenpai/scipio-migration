package be.mytcc.scipio.model.bdo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Monster {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "value")
    private int value;

    public Monster() {
    }

    public Monster(String name, int value) {
        this.name = name;
        this.value = value;
    }

    public Monster(long id, String name, int value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
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
        return "Monster{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", value=" + value +
                '}';
    }

}
