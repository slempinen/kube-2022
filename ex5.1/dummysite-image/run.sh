#!/bin/sh
cd /usr/share/nginx/html
rm -rf ./*
# See: https://serverfault.com/questions/441584/whats-the-best-way-to-create-a-static-backup-of-a-website
wget -E -m -p -k -nH $WEBSITE_URL || { echo 'Downloading website failed' ; exit 1; }
exec "$@"
