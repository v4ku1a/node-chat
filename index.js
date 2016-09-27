var env = require('./.env')
var express = require('express');
var app = express();

var http = require('http');
var serve = http.createServer(app);
var io = require('socket.io')(serve);


var db = require('./mongoose');
db(env.dbUrl);

var MsgModel = require('./model');


app.use('/', express.static('public'));


serve.listen(env.port, function() {
    console.log('Express server listening on port ' + env.port);
});

io.on('connection', function(socket){
	console.log(('usr connected'));

	MsgModel.find().sort('-_id').limit(5)
	    .then(function (result) {
	        console.log("msgs sent");
			socket.emit('chat', result);
	    })
	    .catch(function (err) {
	        console.log(err);
	    });

	socket.on('disconnect', function(){
		console.log('usr disconnected');
	});

	socket.on('chat', function(msg){
		socket.broadcast.emit('chat', msg);

		var modelInstance = new MsgModel({content: msg});

		modelInstance.save()
			.then(function(result){
				console.log("chat message inserted into db: " + msg);
			})
			.catch(function (err) {
		        console.log(err);
		    });
	});
});


