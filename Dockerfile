FROM node:20-alpine AS builder

WORKDIR /sources

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:20-alpine AS staging

WORKDIR /app

COPY --from=builder /sources/package.json /sources/pnpm-lock.yaml ./
COPY --from=builder /sources/tsconfig.json ./
COPY --from=builder /sources/.next ./.next
COPY --from=builder /sources/public ./public
COPY --from=builder /sources/assets ./assets

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["npm", "run", "start"]

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /sources/package.json /sources/pnpm-lock.yaml ./
COPY --from=builder /sources/tsconfig.json ./
COPY --from=builder /sources/.next ./.next
COPY --from=builder /sources/public ./public
COPY --from=builder /sources/assets ./assets


RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile --production --ignore-scripts

EXPOSE 3000

CMD ["npm", "run", "start"]
