require('http').createServer((req, res) => {
  res.writeHead(302, {Location: 'http://127.0.0.1:9999' + req.url});
  res.end();
}).listen(80)
