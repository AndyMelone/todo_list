FROM node:20.12.1-alpine3.18
RUN apk add --no-cache openssl1.1-compat && npm install -g pnpm
WORKDIR /server
COPY ./server .
CMD ["sh"]
