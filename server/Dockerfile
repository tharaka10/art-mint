# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production --no-optional && npm cache clean --force  # Faster, cleaner install

# Copy the rest of your backend code
COPY . .

# Remove dev dependencies if any slipped in
RUN npm prune --production

# Expose the Cloud Run default port
EXPOSE 8080

# Health check (optional: probes /healthz endpoint; add one to your app if needed)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

# Start the server
CMD ["npm", "start"]