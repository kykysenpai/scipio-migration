FROM maven:alpine
COPY . /app
WORKDIR /app
ENTRYPOINT mvn -o -s settings.xml spring-boot:run
