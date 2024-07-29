FROM node:17-alpine 
# we need base image for fundamental necesities of applicaition like OS libraries,language runtime like js,python

#even container share host os kernal ,it still need it's own user space to run the application 

# We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Use script specified in package.json
CMD ["npm", "run", "dev"]