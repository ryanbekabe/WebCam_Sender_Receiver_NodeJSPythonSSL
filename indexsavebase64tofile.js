// Setup basic express server
var sleep = require('system-sleep')
var fs = require('fs')
var express = require('express');
var app = express();
var path = require('path');
const UserAgent = require('user-agents');
var options = {
	  key: fs.readFileSync('/etc/letsencrypt/live/rek.my.id-0001/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/rek.my.id-0001/fullchain.pem')
};
var server = require('https').createServer(options, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4436;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'publicjs')));

var clients = 0;
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
		var date = new Date();
		var h = date.getHours(); // 0 - 23
		var m = date.getMinutes(); // 0 - 59
		var s = date.getSeconds(); // 0 - 59
        var M = date.getMonth();
        var D = date.getDate();
        var Y = date.getFullYear();
		var session = "AM";

		if(h == 0){
			h = 12;
		}

		if(h > 12){
			h = h - 12;
			session = "PM";
		}

		h = (h < 10) ? "0" + h : h;
		m = (m < 10) ? "0" + m : m;
		s = (s < 10) ? "0" + s : s;

		var time = h + "-" + m + "-" + s + "-" + M + D + Y + session;

      var userAgent = new UserAgent();
      var fs      = require('fs');
      //console.log('Tangkap data client: ' + data);
      io.emit('broadcast',{description: data});
            
            fs.writeFile('img/' + time + '.jpg', data, (err) => {
              if (err) return console.error(err)
              console.log('file saved to img/' + time + '.jpg')
            })
       
      //document.getElementById("usersOnline").src = data;
      console.log('UABrowser: ' + userAgent.toString());
   });
   //io.emit('broadcasttakess','take_snapshot()');

   /*var i=0;
   while(i < 10) {
     //sleep(2000);
     console.log('Loop: ' + i);
     io.emit('broadcasttakess','take_snapshot()');
     sleep(10*1000);
     i++;
   }*/

});

