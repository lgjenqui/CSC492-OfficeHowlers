FROM node:18-alpine

# Create frontend directory
WORKDIR /usr/src/app/frontend

EXPOSE 5173

COPY /OfficeHowlers/package.json /OfficeHowlers/package-lock.json ./

RUN npm install --silent

COPY /OfficeHowlers ./

CMD ["npm", "run", "dev"]