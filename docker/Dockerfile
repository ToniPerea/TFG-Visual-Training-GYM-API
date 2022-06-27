#  docker build -t back/server .  -f docker/Dockerfile
# docker run -it -p 8080 back/server

FROM node:18.4.0

WORKDIR /home/node

COPY . .

RUN npm install

EXPOSE 8080

CMD node app.js