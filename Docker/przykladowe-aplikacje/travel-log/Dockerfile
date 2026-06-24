# --- Etap 1: instalacja zależności ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- Etap 2: budowanie aplikacji ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* zmienne są "wpiekane" do kodu klienckiego w czasie budowania,
# więc muszą być dostępne jako ARG/ENV już na tym etapie — przekazanie ich
# tylko w "environment" docker-compose w runtime NIE zadziała dla komponentów klienckich.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# --- Etap 3: obraz produkcyjny (tylko niezbędne pliki z .next/standalone) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
