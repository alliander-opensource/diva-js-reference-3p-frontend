FROM nginx:1.13-alpine

# Install perl (needed for envtemplating)
RUN apk add --update perl && rm -rf /var/cache/apk/*

# Overwrite default config with our own
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

# Copy templating tools
COPY nginx/env.template.js .
COPY nginx/envtemplate.sh .
RUN chmod +x ./envtemplate.sh

# Set defaiult value for BASE_URL
ENV BASE_URL=''

# run startup script on startup
COPY nginx/startup.sh .
RUN chmod +x ./startup.sh
CMD [ "./startup.sh" ]
