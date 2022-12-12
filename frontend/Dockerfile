# FROM node:16.17.0
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# ENV PATH /app/node_modules/.bin:$PATH

# # Installing dependencies
# COPY package.json package-lock.json ./ 
# RUN npm install

# EXPOSE 3000

# # Running the app
# CMD "npm" "start"
# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json*  ./
# RUN npm install --package-lock-only
RUN npm install


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

EXPOSE 3000

CMD ["node", "server.js"]

FROM deps AS development
RUN npm ci
COPY . .

EXPOSE 3000

# Running the app
CMD "npm" "start"
