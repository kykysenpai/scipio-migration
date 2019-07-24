FROM jboss/keycloak:4.7.0.Final

ENV DB_PORT=3306
ENV DB_DATABASE=keycloak
ENV DB_USER=keycloak
ENV DB_PASSWORD=password
ENV DB_ADDR=mysql
ENV DB_VENDOR=mysql

ENV KEYCLOAK_USER=admin
ENV KEYCLOAK_PASSWORD=password

ENV KEYCLOAK_IMPORT_DIR=exported_keycloak_realm

COPY ./wait-for-it.sh /opt/jboss

COPY ${KEYCLOAK_IMPORT_DIR} /opt/jboss/keycloak/exported_keycloak_realm

ENTRYPOINT ["/bin/bash","/opt/jboss/wait-for-it.sh", "mysql:3306", "-t", "0", "--", "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0", "-Dkeycloak.migration.action=import", "-Dkeycloak.migration.provider=dir", "-Dkeycloak.migration.dir=/opt/jboss/keycloak/exported_keycloak_realm"]
