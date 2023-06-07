FROM openjdk:18-jdk-alpine
COPY target/SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar
# Different time zone needed because the original docker container uses gmt 0
RUN apk add --no-cache tzdata
ENV TZ=Europe/Bucharest
ENTRYPOINT ["java","-jar","/SpringChatRoomBackEnd-0.0.1-SNAPSHOT.jar","-web -webAllowOthers -browser"]
EXPOSE 8080
