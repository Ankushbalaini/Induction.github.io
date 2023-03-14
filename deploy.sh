
echo "Deploying App files to server"
scp -r ./app root@176.58.103.115:/var/www/api.bjsinduction.com/app

# echo "Deploying images to server"
# scp -r ./images root@176.58.103.115:/var/www/api.bjsinduction.com

# echo "Deploying env to server"
# scp -r ./.env root@176.58.103.115:/var/www/api.bjsinduction.com

# echo "Deploying nacl to server"
# scp -r ./nacl.json root@176.58.103.115:/var/www/api.bjsinduction.com

# echo "Deploying package-lock to server"
# scp -r ./package-lock.json root@176.58.103.115:/var/www/api.bjsinduction.com

# echo "Deploying package to server"
# scp -r ./package.json root@176.58.103.115:/var/www/api.bjsinduction.com

# echo "Deploying README to server"
# scp -r ./README.md root@176.58.103.115:/var/www/api.bjsinduction.com

# echo "Deploying server file to server"
# scp -r ./server.js root@176.58.103.115:/var/www/api.bjsinduction.com


echo "Done!"