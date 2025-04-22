# Base image
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --force

RUN npm install @nestjs/config --force

RUN  npm install class-validator --force

COPY apps/product_service ./apps/product_service


EXPOSE 5000

# Start the service
CMD ["npm", "run", "start:prod", "--", "--app", "product_service"]
