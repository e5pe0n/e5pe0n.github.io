# Build context is api/ on its own, so the workspace lockfile isn't available
# here; package.json pins every direct dependency to an exact version instead.

FROM node:22-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN npm install --global pnpm@12.9.1 && npm cache clean --force
WORKDIR /app
COPY package.json ./

FROM base AS build
# Only tsc runs here; the dev tools' build scripts (esbuild's) aren't needed.
RUN pnpm install --ignore-scripts
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN pnpm build

FROM base AS deps
RUN pnpm install --prod

FROM node:22-slim
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY fixtures ./fixtures
USER node
EXPOSE 8080
CMD ["node", "dist/index.js"]
