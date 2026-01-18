FROM oven/bun:latest

WORKDIR /app

# Copy dependency files
COPY package.json bun.lockb ./

# Install dependencies using Bun (much faster than npm)
RUN bun install

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["bun", "run", "dev", "--", "--host"]
