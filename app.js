var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jsonfile = require('jsonfile');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('chat', { title: 'stroke! Chat' })
});

app.get('/channels', function(req, res){
    var file = 'db/channels.json';
    res.send(jsonfile.readFileSync(file));
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