# docker build --platform=amd64 -t back/server . -f docker/Dockerfile
# docker run -it -p 8080:8080 back/server

FROM node:16.16

WORKDIR /home/node

COPY . .

RUN npm install @mapbox/node-pre-gyp -g
RUN npm install
RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2-runtime", "app.js", ".pm2/process.js"]