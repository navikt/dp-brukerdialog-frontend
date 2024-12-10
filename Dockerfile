FROM node:23-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY build/ build/
COPY ./package.json ./
COPY node_modules/ node_modules/

CMD ["npm", "run" ,"start"]