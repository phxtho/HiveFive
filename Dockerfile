FROM  node:10.21.0-alpine3.9 AS app-build

WORKDIR /usr/src/app
COPY hive-five-app/package*.json ./
RUN npm install && mkdir hive-five-app && mv node_modules ./hive-five-app
COPY hive-five-app ./hive-five-app
RUN cd hive-five-app && npm run build

FROM node:10.21.0-alpine3.9 AS server-build
WORKDIR /root/
COPY --from=app-build /usr/src/app/hive-five-app/dist/hive-five-app ./
COPY hive-five-server/package*.json ./
RUN npm install
COPY hive-five-server/src/index.js .

EXPOSE 4444

ENTRYPOINT [ "node" ]
CMD ["index.js"]
