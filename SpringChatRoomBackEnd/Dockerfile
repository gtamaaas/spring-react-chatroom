FROM openjdk:18-jdk-alpine as builder

WORKDIR /app

# Copy the Maven wrapper files to the container
COPY .mvn/ .mvn
COPY mvnw .

# Copy the project files to the container
COPY pom.xml .
COPY src/ src/

# Build the project
RUN ./mvnw clean install

FROM openjdk:18-jdk-alpine as production

# Copy the built JAR file to the container
COPY --from=builder app/target/SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar

# Install the time zone data
RUN apk add --no-cache tzdata
ENV TZ=Europe/Bucharest

# Set the entry point and expose the port
ENTRYPOINT ["java", "-jar", "SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar", "-web", "-webAllowOthers", "-browser"]
EXPOSE 8080
