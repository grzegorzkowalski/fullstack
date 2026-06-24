FROM node:20-alpine

WORKDIR /app

# Najpierw tylko pliki potrzebne do instalacji zależności — lepsze cache'owanie warstw Dockera
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Generowanie Prisma Client na podstawie schema.prisma (wymaga dostępu do internetu
# przy pierwszym build — pobiera silniki binarne Prisma)
RUN npx prisma generate

# Teraz reszta kodu aplikacji
COPY . .

EXPOSE 4000

# Przy starcie kontenera: zastosuj migracje na bazie (jeśli jeszcze nie zastosowane),
# a następnie uruchom serwer. "migrate deploy" jest bezpieczne do użycia w produkcji
# i przy każdym restarcie kontenera (nie tworzy nowych migracji, tylko stosuje istniejące).
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
