# URL_shortner

This is a small URL shortener service.

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