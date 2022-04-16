FROM alpine
RUN apk add --update nodejs npm qpdf
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]