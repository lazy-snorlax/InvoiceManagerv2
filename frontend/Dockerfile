FROM node:lts

RUN mkdir -p /opt/app
COPY package.json package-lock.json .npmrc /opt/

RUN cd /opt && npm install

ENV NODE_PATH /opt/node_modules
ENV PATH /opt/node_modules/.bin:$PATH

COPY . /opt/app

USER node
RUN mkdir /home/node/npm-global && npm config set prefix '~/npm-global'

WORKDIR /opt/app
EXPOSE 8080

CMD ["npm", "run", "dev"]