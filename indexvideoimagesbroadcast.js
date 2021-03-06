// Setup basic express server
var sleep = require('system-sleep')
var fs = require('fs')
var express = require('express');
var app = express();
var path = require('path');
const UserAgent = require('user-agents');
var options = {
	  key: fs.readFileSync('/etc/letsencrypt/live/rek.my.id/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/rek.my.id/fullchain.pem')
};
var server = require('https').createServer(options, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4438;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'publicjsvib')));

//const io = require('socket.io')(server);
//app.use(express.static(__dirname + '/public'));
io.sockets.on('error', e => console.log(e));
io.sockets.on('connection', function (socket) {
  socket.on('sendImage', function (data) {
    socket.broadcast.emit('getImage', data);
  });
});
/*var clients = 0;
io.on('connection', function (client) {
	clients++;
	//io.emit('broadcast',{ description: clients + ' online.'});
         console.log('Client connect! ' + clients + ' online!');

	client.on('disconnect', function () {
		clients--;
		//io.emit('broadcast',{ description: clients + ' clients connected!'});
		console.log('Client disconnect! ' + clients + ' online!');
	});
   client.on('clientoserver', function(data) {
      var userAgent = new UserAgent();
      //console.log('Tangkap data client: ' + data);
      io.emit('broadcast',{description: data});
      //document.getElementById("usersOnline").src = data;
      console.log('UABrowser: ' + userAgent.toString());
   });
   //io.emit('broadcasttakess','take_snapshot()');
});
*/
