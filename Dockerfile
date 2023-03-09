# build environment
FROM node:14-alpine@sha256:2825e1c8aad5786d79d6fce6ce14cf4c903bd4e03b84f586afe4e39430665fe4 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# production environment
FROM nginx:stable-alpine@sha256:db81e6644d4896391d83b92e6cb7ff7f9f0cfa5a14d2c7a621d682be99d90f43
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD nginx -g 'daemon off;'