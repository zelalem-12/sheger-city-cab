FROM node:dubnium-buster-slim

USER root

RUN apt-get update && apt-get install --assume-yes wget

# Pre Build Commands
RUN wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/node/express/pre-build-2.sh
RUN chmod 775 ./pre-build-2.sh
RUN sh pre-build-2.sh

RUN wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/database/db-setup.sh
RUN chmod 775 ./db-setup.sh
RUN sh db-setup.sh

COPY . /tmp/
WORKDIR /tmp/

EXPOSE 8080

# Build the app
RUN wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/node/express/build.sh
RUN chmod 775 ./build.sh
RUN sh build.sh

# Add extra docker commands here (if any)...

# Run the app
RUN wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/node/express/run-2.sh
RUN chmod 775 ./run-2.sh
CMD sh run-2.sh