package be.mytcc.scipio.config;

import be.mytcc.scipio.bot.listener.bdo.HuntListener;
import be.mytcc.scipio.bot.listener.communistSplit.CommunistSplitListener;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.DockerCmdExecFactory;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.jaxrs.JerseyDockerCmdExecFactory;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
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

    @Value("${docker.host}")
    private String dockerHost;

    @Value("${spotify.clientId}")
    private String spotifyClientId;

    @Value("${spotify.clientSecret}")
    private String spotifyClientSecret;

    @Value("${spotify.redirectUri}")
    private String spotifyRedirectUri;

    @Bean
    @Autowired
    public JDA jda(CommunistSplitListener communistSplitListener, HuntListener huntListener) throws Exception {
        return new JDABuilder(token)
                .addEventListener(huntListener)
                .addEventListener(communistSplitListener)
                .build().awaitReady();
    }

    @Bean
    public SpotifyApi spotifyApi() {
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setClientId(spotifyClientId)
                .setClientSecret(spotifyClientSecret)
                .setRedirectUri(SpotifyHttpManager.makeUri(spotifyRedirectUri))
                .build();
        try {
            ClientCredentials clientCredentials = spotifyApi.clientCredentials().build().execute();
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());
        } catch (Exception ex) {
            logger.error("Error getting token when initializing Spotify Component", ex);
        }
        return spotifyApi;
    }

    @Bean
    public DockerClient dockerClient() {
        DockerClientConfig dockerClientConfig = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost(dockerHost)
                .build();

        DockerCmdExecFactory dockerCmdExecFactory = new JerseyDockerCmdExecFactory()
                .withReadTimeout(60000)
                .withConnectTimeout(5000)
                .withMaxTotalConnections(100)
                .withMaxPerRouteConnections(10);

        return DockerClientBuilder.getInstance(dockerClientConfig)
                .withDockerCmdExecFactory(dockerCmdExecFactory)
                .build();
    }
}
