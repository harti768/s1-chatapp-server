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

app.get('/login', function(req, res){
    try {
        // TODO this is a highly experimental login it should never reach production in this state
        var user = require('./lib/login')
            .login(req.query.username, req.query.password);

        res.send({
            token: user.token,
            name: user.name,
            thumbnail: user.thumbnail
        });
    } catch(e){
        res.status(401).send({ error: 'invalid credentials' });
    }
});

app.get('/auth', function(req, res){
    try {
        // TODO this is a highly experimental login it should never reach production in this state
        var user = require('./lib/login')
            .authorize(req.query.token);

        res.send({
            name: user.name,
            thumbnail: user.thumbnail
        });
    } catch(e){
        res.status(401).send({ error: 'invalid token' });
    }
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