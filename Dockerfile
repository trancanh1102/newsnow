FROM node:20.12.2-alpine AS builder
WORKDIR /usr/src
COPY . .
RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM node:20.12.2-alpine
WORKDIR /usr/app
COPY --from=builder /usr/src/dist/output/server ./output/server
COPY --from=builder /usr/src/dist/output/public ./output/public
COPY --from=builder /usr/src/dist/output/nitro.json ./output/nitro.json
RUN ln -s /usr/app/output/public /usr/app/output/server/chunks/public
ENV HOST=0.0.0.0 PORT=4444 NODE_ENV=production
EXPOSE $PORT
CMD ["node", "output/server/index.mjs"]
