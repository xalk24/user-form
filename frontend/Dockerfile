FROM node:16-alpine as build-stage
LABEL authors="sergey"
WORKDIR /app
RUN apk update && apk upgrade
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
