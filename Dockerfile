FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_GO_API_URL=http://localhost:3000
ARG VITE_NODE_API_URL=http://localhost:3001
ENV VITE_GO_API_URL=$VITE_GO_API_URL
ENV VITE_NODE_API_URL=$VITE_NODE_API_URL
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
