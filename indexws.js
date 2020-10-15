const https = require('https');
const fs = require('fs');
const ws = new require('ws');
var options = {
   key: fs.readFileSync('/etc/letsencrypt/live/rek.my.id/privkey.pem'),
   cert: fs.readFileSync('/etc/letsencrypt/live/rek.my.id/fullchain.pem')
};
const wss = new ws.Server({noServer: true});
const clients = new Set();
function accept(req, res) {
  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
      // can be Connection: keep-alive, Upgrade
      req.headers.connection.match(/\bupgrade\b/i)) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') { // index.html
    fs.createReadStream('./publicjs/indexws.html').pipe(res);
  } else if (req.url == '/indexviewws.html') { // index.html
    fs.createReadStream('./publicjs/indexviewws.html').pipe(res);
  } else if (req.url == '/indexviewws2.html') { // index.html
    fs.createReadStream('./publicjs/indexviewws2.html').pipe(res);
  } else { // page not found
    res.writeHead(404);
    res.end();
  }
}
var sumclients = 0;
function onSocketConnect(ws) {
  clients.add(ws);
  sumclients++;
  for(let client of clients) {
    //client.send(sumclients + ' online.');
  }
  log(`New connection: ` + sumclients);
  ws.on('message', function(message) {
    if(message.length > 5){
		log(`Messag too big...`);
	}else{
		log(`Message received: ${message}`);
	}
    //message = message.slice(0, 50); // max message length will be 50
    message = message;
    for(let client of clients) {
      client.send(message);
    }
  });
  ws.on('close', function() {
	sumclients--;
    for(let client of clients) {
       //client.send(sumclients + ' online!');
    }
    log(`Connection closed: ` + sumclients);
    clients.delete(ws);
  });
}
let log;
if (!module.parent) {
  log = console.log;
  https.createServer(options,accept).listen(4437);
} else {
  log = function() {};
  exports.accept = accept;
}
