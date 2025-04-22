# Base image
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY apps/product_service ./apps/product_service


EXPOSE 5000

# Start the service
CMD ["npm", "run", "start:prod", "--", "--app", "product_service"]
