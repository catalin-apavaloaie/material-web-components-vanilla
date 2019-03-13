FROM node:10.13-jessie

RUN apt-get update \
  && apt-get install -y \
  python-pip \
  && rm -rf /var/lib/apt/lists/*
RUN pip install dumb-init

EXPOSE 8081


RUN mkdir /app
WORKDIR /app

ADD package*.json /app/
RUN npm install

ADD index.html /app/
ADD demo /app/demo
ADD packages /app/packages
ADD scripts /app/scripts

RUN npm run bootstrap

ADD scripts/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD []
