FROM node:20.12.1-alpine3.18
RUN apk add --no-cache openssl1.1-compat && npm install -g pnpm
WORKDIR /server
COPY . .

CMD [ "pnpm", "dlx", "json-server", "--watch", "server/db.json", "--port", "3001" ]
