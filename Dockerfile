FROM node:12-alpine

ARG WORK_DIR=/app
ARG USER=kalin

RUN ["adduser", "-D", "kalin"]
USER ${USER}

WORKDIR ${WORK_DIR}

COPY --chown=kalin back-end $WORK_DIR/back-end
COPY --chown=kalin front-end $WORK_DIR/front-end
COPY --chown=kalin package.json .

RUN ["yarn", "build"]

ENTRYPOINT ["yarn", "start"]
