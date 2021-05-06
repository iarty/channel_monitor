FROM node:12.14.1-alpine as build
COPY ./frontend /app

# Build args
ARG REACT_APP_API_URL

RUN cd /app && npm install
# Environment vars
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN cd /app && npm run build

#Nginx stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /web/chmonitor
