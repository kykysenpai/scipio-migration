package be.mytcc.scipio.bot.listener.bdo;

import be.mytcc.scipio.common.exception.NotFoundException;
import be.mytcc.scipio.common.exception.ParsingException;
import be.mytcc.scipio.model.bdo.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.MessageBuilder;
import net.dv8tion.jda.core.entities.Member;
import net.dv8tion.jda.core.events.message.MessageReceivedEvent;
import net.dv8tion.jda.core.hooks.ListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HuntListener extends ListenerAdapter {

    private Logger logger = LoggerFactory.getLogger(HuntListener.class);

    private final String OFFICER = "Officers";
    private final String GUILD_MASTER = "Guild Master";

    private final String SPLIT = "/";
    private final String PREFIX = "!OK" + SPLIT;

    @Autowired
    private JDA jda;

    @Autowired
    private MonsterRepository monsterRepository;

    @Autowired
    private HuntRepository huntRepository;

    @Autowired
    private GuildMemberRepository guildMemberRepository;

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        try {
            if (event.getMessage().getContentRaw().startsWith(PREFIX) && isOfficerOrGm(event.getMember())) {
                String messageWithoutPrefix = event.getMessage().getContentRaw().replace(PREFIX, "");
                GuildMember guildMember = getMember(event);
                List<Hunt> hunt = parseHunt(messageWithoutPrefix, guildMember);
                List<Hunt> persisted = persistHunt(hunt);
                event.getMessage().delete().queue();
                event.getAuthor().openPrivateChannel().complete().sendMessage(new MessageBuilder()
                        .append("------------------------------\nALL DONE, SUMMARY :\n")
                        .append(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(persisted))
                        .build()).queue();
            }
        } catch (Exception ex) {
            logger.error("Exception while managing received message", ex);
            event.getMessage().delete().queue();
            event.getMember().getUser().openPrivateChannel().complete().sendMessage(new MessageBuilder().append(ex.getMessage()).build()).queue();
        }
    }

    private GuildMember getMember(MessageReceivedEvent event) throws NotFoundException {
        String channelName = event.getTextChannel().getName().toUpperCase();
        GuildMember gm = guildMemberRepository.findByName(channelName).orElse(null);

        if (gm == null) {
            List<Member> membersWithSameNameAsChannel = event.getGuild().getMembersByEffectiveName(channelName, true);
            if (membersWithSameNameAsChannel.size() > 1) {
                throw new NotFoundException("There is more than one user with the same discord nickname as the text channel, please change it");
            } else if (membersWithSameNameAsChannel.size() < 1) {
                throw new NotFoundException("User with same nickname as channel \"" + channelName + "\" not found (case is ignored), so check for special characters and such");
            } else { //user did not yet exist but is in the discord so he's gonna be persisted
                return guildMemberRepository.save(new GuildMember(channelName));
            }
        }

        return gm;
    }

    private Monster getMonster(String name) throws NotFoundException {
        return monsterRepository.findByName(name).orElseThrow(() -> new NotFoundException("The monster \"" + name + "\" was not yet created, no information about tokens value, please add it in scipio"));
    }

    private boolean isOfficerOrGm(Member member) {
        return member.getRoles().stream().anyMatch(role -> role.getName().equals(OFFICER) || role.getName().equals(GUILD_MASTER));
    }

    private List<Hunt> parseHunt(String message, GuildMember guildMember) throws ParsingException, NotFoundException {
        List<Hunt> hunt = new ArrayList<>();

        for (String tuple : message.split(SPLIT)) {
            String[] payment = tuple.split(":");
            if (payment.length != 2) {
                throw new ParsingException("Invalid payment : \"" + tuple + "\"");
            }
            try {
                hunt.add(new Hunt(getMonster(payment[0].toUpperCase()), Integer.parseInt(payment[1]), guildMember));
            } catch (NumberFormatException ex) {
                throw new ParsingException("The value \"" + payment[1] + "\" couldn't be understood as a valid integer");
            }
        }

        return hunt;
    }

    private List<Hunt> persistHunt(List<Hunt> hunt) {
        return huntRepository.saveAll(hunt);
    }
}
