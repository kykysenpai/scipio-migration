package be.mytcc.scipio.config;

import be.mytcc.scipio.model.common.User;
import be.mytcc.scipio.model.common.UserRepository;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor extends HandlerInterceptorAdapter {

    private Logger logger = LoggerFactory.getLogger(TokenInterceptor.class);

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            KeycloakPrincipal keycloakPrincipal = (KeycloakPrincipal) request.getUserPrincipal();
            KeycloakSecurityContext session = keycloakPrincipal.getKeycloakSecurityContext();
            AccessToken token = session.getToken();

            User tokenUser = new User(
                    token.getSubject(),
                    token.getEmail(),
                    token.getPreferredUsername(),
                    token.getGivenName(),
                    token.getFamilyName(),
                    null
            );

            User savedUser = userRepository.findUserByKeycloakId(tokenUser.getKeycloakId()).orElse(tokenUser);
            User user = userRepository.save(savedUser);
            request.setAttribute("user", user);
            return true;
        } catch (Exception ex) {
            logger.error("Invalid Token", ex);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "INVALID TOKEN", ex);
        }

    }

}
