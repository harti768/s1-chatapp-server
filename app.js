var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    // connect

    socket.on('chat message', function(msg){
        // message emit

        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        // disconnect
    });
});

http.listen(3000, function(){
    console.log('stroke serving on *:3000');
});