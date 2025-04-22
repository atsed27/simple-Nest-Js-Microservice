# Base image
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY apps/order_service ./apps/order_service


EXPOSE 5002

# Start the service
CMD ["npm", "run", "start:prod", "--", "--app", "order_service"]
