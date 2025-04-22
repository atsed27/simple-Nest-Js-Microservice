# Base image
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --force

RUN npm install @nestjs/config --force

RUN  npm install class-validator --force

COPY apps/user_service ./apps/user_service


EXPOSE 5001

# Start the service
CMD ["npm", "run", "start:prod", "--", "--app", "user_service"]
