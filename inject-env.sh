#!/bin/sh
# Injects the environment variables into env-config.js

echo "window.env = {" > /usr/share/nginx/html/env-config.js
echo "  VITE_BACKEND_URL: '$(echo $VITE_BACKEND_URL)'," >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js
