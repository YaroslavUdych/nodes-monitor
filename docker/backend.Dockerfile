# ---- deps ----
FROM node:22-alpine AS deps
WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
COPY packages/backend/package.json packages/backend/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm ci

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY packages ./packages

# Build shared first as backend depends on it
RUN npm -w @app/shared run build
RUN npm -w backend run build

# ---- run ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only runtime dependencies + dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/packages/backend ./packages/backend
COPY --from=build /app/packages/shared ./packages/shared

EXPOSE 3000

CMD ["node", "packages/backend/dist/index.js"]
