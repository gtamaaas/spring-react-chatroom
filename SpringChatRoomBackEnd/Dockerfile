FROM openjdk:18-jdk-alpine

WORKDIR /app

# Copy the Maven wrapper files to the container
COPY .mvn/ .mvn
COPY mvnw .

# Copy the project files to the container
COPY pom.xml .
COPY src/ src/

# Build the project
RUN ./mvnw clean install

# Copy the built JAR file to the container
COPY target/SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar

# Install the time zone data
RUN apk add --no-cache tzdata
ENV TZ=Europe/Bucharest

# Set the entry point and expose the port
ENTRYPOINT ["java", "-jar", "/app/SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar", "-web", "-webAllowOthers", "-browser"]
EXPOSE 8080
