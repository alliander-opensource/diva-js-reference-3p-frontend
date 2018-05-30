#!/bin/sh
echo "### Copying environment variables..."
./envtemplate.sh env.template.js /usr/share/nginx/html/env.js
sed -i "s:STARTUP_TIME_BASE_URL:${BASE_URL//:/\:}:g" /usr/share/nginx/html/index.html
echo "### Done! Starting NGINX."
exec nginx -g 'daemon off;'
