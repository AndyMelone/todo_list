
FROM node:20.12.1-alpine3.18
RUN apk add --no-cache openssl1.1-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD  pnpm run build && pnpm run start
