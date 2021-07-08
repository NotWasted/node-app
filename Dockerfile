FROM node:14

# Change working directory or create a new one 
WORKDIR "/app"

# Update packages and install dependency packages for services
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

# Copy package.json and package-lock.json
COPY package.json package.json 
COPY package-lock.json package-lock.json

# Install npm production packages 
RUN npm install 

COPY . .

#ENV NODE_ENV production
#ENV PORT 3000

#EXPOSE 3000

#USER node

CMD ["npm", "start"]