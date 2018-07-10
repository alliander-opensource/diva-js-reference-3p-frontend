FROM nginx:1.15-alpine

# Overwrite default config with our own
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

# Set default value for BASE_URL
ENV BASE_URL=''

# Run startup script on startup
COPY nginx/startup.sh .
CMD [ "./startup.sh" ]
