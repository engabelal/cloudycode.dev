# Use a minimal and official NGINX Alpine image
# Alpine provides a small footprint and reduced attack surface
FROM nginx:alpine3.23-slim

# Remove the default NGINX site configuration
# We provide our own custom nginx.conf
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration
# This layer changes rarely, so placing it early improves cache reuse
COPY docker/nginx.conf /etc/nginx/nginx.conf

# ------------------------------------------------------------------
# Create all required runtime directories and fix permissions
# This is CRITICAL when running NGINX as a non-root user
#
# Without /var/log/nginx owned by nginx:
# NGINX fails to start and HEALTHCHECK will fail (connection refused)
# ------------------------------------------------------------------
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /tmp \
    && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /tmp

# Healthcheck to verify NGINX is responding
# Docker and orchestrators (K8s) use this to detect failures
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1

# Copy static website files into the container
# This is the most frequently changing layer
COPY --chown=nginx:nginx . /usr/share/nginx/cloudycode

# Run the container as the non-root nginx user for security hardening
USER nginx

# Expose the port NGINX listens on
EXPOSE 8080

# Start NGINX in the foreground (required for containers)
CMD ["nginx", "-g", "daemon off;"]