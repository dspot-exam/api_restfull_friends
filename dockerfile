# Dependencias
FROM node:21-alpine3.19 as deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install


# Stage build
FROM node:21-alpine3.19 as build

# args from docker-compose
ARG DATABASE_URL
ARG PORT
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run test
RUN npm run test:e2e
RUN npm run build
RUN npm ci -f --omit=dev && npm cache clean --force


# Stage prod
FROM node:21-alpine3.19 as prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD [ "node", "dist/main.js" ]