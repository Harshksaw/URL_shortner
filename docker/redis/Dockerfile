FROM redis:7.2-alpine

# Copy a custom redis configuration if provided. If you don't provide redis.conf
# the default configuration from the base image will be used.
# To use your own config, place it at docker/redis/redis.conf in the repo.

ARG REDIS_CONF_PATH=/usr/local/etc/redis/redis.conf

COPY docker/redis/redis.conf ${REDIS_CONF_PATH}

# Expose the standard Redis port (this is mostly informative; compose maps ports)
EXPOSE 6379

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
