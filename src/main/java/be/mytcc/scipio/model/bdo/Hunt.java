package be.mytcc.scipio.model.bdo;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Hunt {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "monster_id", nullable = false)
    private Monster monster;

    @Column(name = "amount")
    private int amount;

    @ManyToOne(optional = false)
    @JoinColumn(name = "guild_member_id", nullable = false, referencedColumnName = "name")
    private GuildMember guildMember;

    @CreatedDate
    @Column(name = "created_date", nullable = false)
    private Date createdDate;

    public Hunt(){

    }

    public Hunt(Monster monster, int amount, GuildMember member){
        this.monster = monster;
        this.amount = amount;
        this.guildMember = member;
    }

    public Hunt(long id, Monster monster, int amount, GuildMember member, Date createdDate){
        this.id = id;
        this.monster = monster;
        this.amount = amount;
        this.guildMember = member;
        this.createdDate = createdDate;
    }

    public GuildMember getGuildMember() {
        return guildMember;
    }

    public void setGuildMember(GuildMember guildMember) {
        this.guildMember = guildMember;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Monster getMonster() {
        return monster;
    }

    public void setMonster(Monster monster) {
        this.monster = monster;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }


    @Override
    public String toString() {
        return "Hunt{" +
                "id=" + id +
                ", monster=" + monster +
                ", amount=" + amount +
                ", guildMember=" + guildMember +
                ", createdDate=" + createdDate +
                '}';
    }

}
