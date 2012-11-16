uglifyjs -nc fishbone.js > fishbone.min.js
gzip -c -f --best fishbone.min.js > fishbone.min.js.gz
wc -c fishbone.min.js.gz
wc -c fishbone.min.js