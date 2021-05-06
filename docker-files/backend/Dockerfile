FROM node:14-alpine
RUN npm install -g @nestjs/cli
RUN mkdir -p /app
WORKDIR /app
COPY ./backend /app
#COPY ./backend/package.json /app
RUN npm install
EXPOSE 5000
EXPOSE 3333
CMD ["npm", "run", "start:dev"]
