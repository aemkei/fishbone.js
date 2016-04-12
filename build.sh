uglifyjs --max-line-len 78  -mc -- fishbone.js > fishbone.min.js
gzip -c -f --best fishbone.min.js > fishbone.min.js.gz

uglifyjs --max-line-len 78 -mc -- fishbone.js
echo " // c-{{{-<"
wc -c fishbone.min.js.gz
wc -c fishbone.min.js
