package be.mytcc.scipio.config;

import be.mytcc.scipio.bot.listener.bdo.HuntListener;
import net.dv8tion.jda.core.JDA;
import net.dv8tion.jda.core.JDABuilder;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    private Logger logger = LoggerFactory.logger(AppConfig.class);

    @Value("${discord.bot.tcc.token}")
    private String token;

    @Autowired
    private HuntListener huntListener;

    @Bean
    public JDA jda() throws Exception {
        return new JDABuilder(token)
                .addEventListener(huntListener)
                .build().awaitReady();
    }
}
