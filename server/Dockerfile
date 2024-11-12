FROM node:20.12.1-alpine3.18
WORKDIR /app
RUN npm i -g json-server
COPY db.json .
CMD ["json-server", "--watch", "db.json", "--port", "3001"]

