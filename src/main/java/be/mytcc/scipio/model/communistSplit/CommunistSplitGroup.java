package be.mytcc.scipio.model.communistSplit;

import be.mytcc.scipio.model.common.User;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class CommunistSplitGroup {

    @Id
    @GeneratedValue
    private long id;

    @CreatedDate
    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "name")
    private String name;

    @Column(name = "discord_guild_id")
    private String discordGuildId;

    @Column(name = "discord_default_channel_id")
    private String discordDefaultChannelId;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "splitGroup"),
            inverseJoinColumns = @JoinColumn(name = "user"))
    private Set<User> users;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getDiscordGuildId() {
        return discordGuildId;
    }

    public void setDiscordGuildId(String discordGuildId) {
        this.discordGuildId = discordGuildId;
    }

    public String getDiscordDefaultChannelId() {
        return discordDefaultChannelId;
    }

    public void setDiscordDefaultChannelId(String discordDefaultChannelId) {
        this.discordDefaultChannelId = discordDefaultChannelId;
    }

    @Override
    public String toString() {
        return "CommunistSplitGroup{" +
                "id=" + id +
                ", createdDate=" + createdDate +
                ", name='" + name + '\'' +
                ", discordGuildId='" + discordGuildId + '\'' +
                ", discordDefaultChannelId='" + discordDefaultChannelId + '\'' +
                ", users=" + users +
                '}';
    }
}
