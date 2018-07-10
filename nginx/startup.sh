#!/bin/sh
echo "### Setting base url in index.html to: $BASE_URL"
sed -i "s&STARTUP_TIME_BASE_URL&$BASE_URL&g" /usr/share/nginx/html/index.html
echo "### Done! Starting NGINX."
exec nginx -g 'daemon off;'
