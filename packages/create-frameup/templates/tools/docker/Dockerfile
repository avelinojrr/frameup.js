FROM node:18-alpine

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto de la app
EXPOSE 4000

# Comando para correr la app
CMD [ "node", "src", "index.js" ]