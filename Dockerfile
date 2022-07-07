#stage 1
FROM node:12.18.1 as node
WORKDIR /jobchain
COPY . .
RUN npm install
EXPOSE 9090
CMD ['ng', 'serve', '--host', '0.0.0.0']


#stage 2
FROM nginx:alpine
COPY --from=node /jobchain/dist/jobchain /usr/share/nginx/html
