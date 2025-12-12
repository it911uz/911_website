FROM node:22.20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i

FROM base AS builder
WORKDIR /app

ARG ENV_FILE=.env.production
ENV ENV_FILE=${ENV_FILE}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN cp ${ENV_FILE} .env.production

RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p .next/cache && \
    mkdir -p .next/server && \
    chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "server.js"]
