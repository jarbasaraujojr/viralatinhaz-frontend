# Estágio 1: Construir a aplicação
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Rodar a aplicação
FROM node:18-alpine AS runner

EXPOSE 3000

WORKDIR /app
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/tsconfig.json ./

CMD ["npm", "start"]
