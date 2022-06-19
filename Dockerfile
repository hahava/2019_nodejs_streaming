FROM ubuntu:16.04

ARG WORK_DIR=/app
ARG USER=kalin

RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install gcc g++ make nodejs -y

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt-get install yarn -y

RUN ["adduser", "kalin"]
USER ${USER}

WORKDIR ${WORK_DIR}

COPY --chown=kalin back-end $WORK_DIR/back-end
COPY --chown=kalin front-end $WORK_DIR/front-end
COPY --chown=kalin package.json .

RUN ["yarn", "build"]

ENTRYPOINT ["yarn", "start"]
