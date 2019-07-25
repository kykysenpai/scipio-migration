package be.mytcc.scipio.config;

import be.mytcc.scipio.model.common.User;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor extends HandlerInterceptorAdapter {

    private Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            KeycloakPrincipal keycloakPrincipal = (KeycloakPrincipal) request.getUserPrincipal();
            KeycloakSecurityContext session = keycloakPrincipal.getKeycloakSecurityContext();
            AccessToken token = session.getToken();
            User user = getUserInfosFromToken(token);
            request.setAttribute("user", user);
            return true;
        } catch (Exception ex) {
            logger.error("Invalid Token", ex);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "INVALID TOKEN", ex);
        }

    }

    private User getUserInfosFromToken(AccessToken token) {
        User user = new User();
        user.setKeycloak_id(token.getSubject());
        return user;
    }
}
