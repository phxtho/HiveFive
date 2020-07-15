FROM node:10.21.0-alpine3.9
WORKDIR /root/
COPY package*.json ./
RUN npm install
COPY index.js .

EXPOSE 3000

ENTRYPOINT [ "node" ]
CMD [ "index.js" ]