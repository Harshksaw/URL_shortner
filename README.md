# URL_shortner

This is a small URL shortener service.

## Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB
- Redis

### Installation
1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Set environment variables (see below)
5. `npm run dev` for development or `npm run build && npm start` for production

### Environment Variables
- `PORT`: Server port (default 3001)
- `MONGODB_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection URL (default redis://localhost:6379)
- `REDIS_COUNTER_KEY`: Redis key for counter (default url_id_counter)

## Running Redis with Docker

This project expects a Redis server at `redis://localhost:6379` by default (see `src/config/redis.ts`). To run Redis locally via Docker Compose:

1. Start the Redis service:

```bash
docker compose up -d
```

2. Verify the container is healthy:

```bash
docker compose ps
```

3. Test connectivity from your host using the Redis CLI (installed separately) or by exec into the container:

```bash
# from host (if redis-cli installed)
redis-cli -h 127.0.0.1 -p 6379 ping

# or exec into the container
docker compose exec redis redis-cli ping
```

You should see `PONG` when Redis is reachable.

Persistent data is stored in a Docker volume named `url_shortner_redis_data` defined in `docker-compose.yml`.

## Deploying to Render

This app can be deployed to Render using the provided `Dockerfile` for the web service. Render provides managed databases for MongoDB and Redis (do not deploy custom Docker containers for databases).

1. Connect your GitHub repo to Render
2. Create a new Web Service:
   - Select Docker as the runtime (uses `Dockerfile`)
3. Create managed databases:
   - Add a MongoDB instance (free tier available)
   - Add a Redis instance (free tier available)
4. In the Web Service settings, set environment variables:
   - `PORT`: (Render sets this automatically)
   - `MONGODB_URI`: Connection string from your Render MongoDB instance
   - `REDIS_URL`: Connection string from your Render Redis instance
   - `REDIS_COUNTER_KEY`: `url_id_counter` (optional)
5. Deploy the Web Service

The app will connect to the managed databases using the env vars. The custom Redis Dockerfile (`docker/redis/`) is for local development only (e.g., with `docker-compose.yml`).