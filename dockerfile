FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install --verbose
COPY . .
CMD ["npm", "start"]
