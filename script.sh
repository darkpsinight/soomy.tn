#!/bin/bash

# Change directory to /var/www/soomy/backend
cd /var/www/soomy/backend
sleep 2

# Remove the build/ directory recursively and forcefully
rm -rf build/
sleep 2

# Change directory to /var/www/soomy/frontend
cd /var/www/soomy/frontend
sleep 2

# Run the npm run build command
npm run build
sleep 2

# Copy the contents of /var/www/soomy/frontend/build/ to /var/www/soomy/backend
cp /var/www/soomy/frontend/build/ /var/www/soomy/backend -r
sleep 2

# Change directory to /var/www/soomy/backend
cd /var/www/soomy/backend
sleep 2

# Start all processes with pm2
pm2 start all
sleep 2

# Restart all processes with pm2
pm2 restart all
sleep 2

# Reload all processes with pm2
pm2 reload all
sleep 2

# Print a message to indicate the script has finished
echo "Script execution completed."

# Print a message to indicate pm2 logs
echo "To review the log of the server, please run: \"pm2 log all\""
