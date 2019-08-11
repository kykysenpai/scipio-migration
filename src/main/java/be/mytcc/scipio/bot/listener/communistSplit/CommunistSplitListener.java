package be.mytcc.scipio.bot.listener.communistSplit;

import be.mytcc.scipio.model.communistSplit.CommunistSplitPayment;
import be.mytcc.scipio.model.communistSplit.CommunistSplitPaymentUser;
import net.dv8tion.jda.core.EmbedBuilder;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.entities.MessageEmbed;
import net.dv8tion.jda.core.entities.TextChannel;
import net.dv8tion.jda.core.entities.User;
import net.dv8tion.jda.core.hooks.ListenerAdapter;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class CommunistSplitListener extends ListenerAdapter {

    @Autowired
    @Lazy
    private JDA jda;

    @Value("${frontend.baseurl}")
    private String frontendBaseUrl;

    private Logger logger = LoggerFactory.getLogger(CommunistSplitListener.class);

    public void createNewPayment(CommunistSplitPayment payment) {
        try {
            if (!StringUtils.isEmpty(payment.getSplitGroup().getDiscordDefaultChannelId())) {
                TextChannel channel = jda.getTextChannelById(payment.getSplitGroup().getDiscordDefaultChannelId());
                if (channel != null) {
                    String description = buildDescription(payment);
                    MessageEmbed messageEmbed = buildEmbed(payment, description);
                    channel.sendMessage(messageEmbed).queue();
                } else {
                    logger.error("Discord channel with ID " + payment.getSplitGroup().getDiscordDefaultChannelId() + " doesn't seem to exist");
                }
            } else {
                logger.info("No Discord ID for default channel entered in Group " + payment.getSplitGroup().getName());
            }
        } catch (Exception ex) {
            logger.error("Error while sending new payment notification with bot", ex);
        }
    }

    private void addParticipants(CommunistSplitPayment payment, StringBuilder descriptionBuilder) {
        for (CommunistSplitPaymentUser participation : payment.getSplitPaymentUsers()) {
            String mention;
            User mentionnedUser = null;

            if (!StringUtils.isEmpty(participation.getUser().getDiscordId())) {
                mentionnedUser = jda.getUserById(participation.getUser().getDiscordId());
            }

            if (mentionnedUser == null) {
                mention = "**" + participation.getUser().getUsername() + "**";
            } else {
                mention = mentionnedUser.getAsMention();
            }

            descriptionBuilder
                    .append("\n")
                    .append(mention)
                    .append(" - [profile](" + frontendBaseUrl + "/users/" + participation.getUser().getKeycloakId() + ") - **" + participation.getOwes() + " €**");
        }
    }

    private String buildDescription(CommunistSplitPayment payment) {
        StringBuilder descriptionBuilder = new StringBuilder("----------"
                + "\nAmount : **" + payment.getAmount() + " €**"
                + "\nGroup : **" + payment.getSplitGroup().getName() + "**"
                + "\n" + (StringUtils.isEmpty(payment.getDescription()) ? "No description given" : payment.getDescription())
                + "\n----------\nSplit :");

        addParticipants(payment, descriptionBuilder);
        descriptionBuilder.append("\n----------");

        return descriptionBuilder.toString();
    }

    private MessageEmbed buildEmbed(CommunistSplitPayment payment, String description) {
        EmbedBuilder embedBuilder = new EmbedBuilder()
                .setAuthor("Created by " + payment.getPayer().getUsername() + "", frontendBaseUrl + "/users/" + payment.getPayer().getKeycloakId())
                .setTitle("Link to payment \"" + payment.getTitle() + "\"", frontendBaseUrl + "/communist-split/payments/" + payment.getId())
                .setDescription(description)
                .setTimestamp(payment.getCreatedDate().toInstant());

        return embedBuilder.build();
    }

}
