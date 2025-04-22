# Base image
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY apps/apigetway ./apps/apigetway


EXPOSE 3000

# Start the service
CMD ["npm", "run", "start:prod", "--", "--app", "apigetway"]
