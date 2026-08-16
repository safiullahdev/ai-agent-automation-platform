# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk upgrade --no-cache && \
    npm ci --omit=dev && \
    npm cache clean --force && \
    rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /opt/yarn-v1.22.22

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/agents/coordinator-agent/public ./agents/coordinator-agent/public

EXPOSE 3000

ENV NODE_ENV=production
ENV APP_ENV=INT
ENV PORT=3000

CMD ["node", "dist/src/api/server.js"]