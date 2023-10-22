FROM node:18

# Create backend directory
WORKDIR /usr/src/app/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN mkdir ./HowlBack
COPY ./HowlBack/package.json ./HowlBack
COPY ./HowlBack/package-lock.json ./HowlBack
WORKDIR /usr/src/app/backend/HowlBack
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY ./HowlBack .
COPY ./Models ../Models
RUN npm run build
EXPOSE 8080
RUN ls -a
CMD [ "node", "dist/HowlBack/src/app.js" ]

