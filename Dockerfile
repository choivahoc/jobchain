#stage 1
FROM node:12.22.6 as node
WORKDIR /jobchain
COPY . .
RUN npm install
RUN npm run build --prod
EXPOSE 9090
CMD ['ng', 'serve', '--host', '0.0.0.0']


#stage 2
FROM nginx:alpine
COPY --from=node /jobchain/dist/jobchains /usr/share/nginx/html
