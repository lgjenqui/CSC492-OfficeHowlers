FROM node:18-alpine

# Create frontend directory
WORKDIR /usr/src/app/frontend

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]