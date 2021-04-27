FROM node:12.14.1-alpine

#VOLUME /src/app/build
RUN mkdir -p /app
COPY ./backend/package.json /app/

COPY ./backend /app
RUN npm install

CMD ["npm", "run", "start:dev"]