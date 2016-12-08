FROM mhart/alpine-node:6.3

RUN addgroup -S app && adduser -S -g app app
RUN mkdir -p /src && chown -R app:app /src
RUN npm install nodemon -g

USER app
WORKDIR /src
COPY package.json /src/package.json
RUN npm install
