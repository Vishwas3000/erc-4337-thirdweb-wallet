#build stage
FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn cache clean
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

#production stage
FROM node:18-alpine
WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN yarn install --only=production --forzen-lockfile
RUN rm package*.json
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

