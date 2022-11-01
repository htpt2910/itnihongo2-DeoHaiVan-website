FROM node:16.17.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH

# Installing dependencies
COPY package.json package-lock.json ./ 
RUN npm install

EXPOSE 3000

# Running the app
CMD "npm" "start"
