# Base image
FROM node:16


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY apps/user_service ./apps/user_service


EXPOSE 5001

# Start the service
CMD ["npm", "run", "start:prod", "--", "--app", "user_service"]
