npm run build
mv ./dist ./app
mkdir -p ./app/src/assets
cp -r ./src/assets/ ./app/src/assets/
scp -r ./app makeck@makeck.tail6cf7b.ts.net:/home/makeck/makeck/nginx/statics/