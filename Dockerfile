FROM node:23-alpine

COPY build/ build/
COPY ./package.json ./
COPY node_modules/ node_modules/

CMD ["npm", "run" ,"start"]