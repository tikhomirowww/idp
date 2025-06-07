FROM node:18

WORKDIR /app

COPY package*.json ./

# Устанавливаем json-server и все зависимости
RUN npm install json-server

COPY . .

EXPOSE 3000

CMD ["npx", "json-server", "--watch", "db.json", "--port", "3001", "--host", "0.0.0.0"]
