#echo "Switching to branch master "
#git checkout master

echo "Building app..."
npm run build 

echo "Deplotying files to server"
scp -r build/* root@176.58.103.115:/var/www/bjsinduction.com

echo "Done!"