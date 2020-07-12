var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');


app.use(express.static('../static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


var dbURL = "mongodb+srv://user:user@practicedb.pdomq.mongodb.net/practiceDB?retryWrites=true&w=majority";
var chatURL = "mongodb+srv://user:user@chatmessages.lnikr.mongodb.net/chatMessages?retryWrites=true&w=majority";

var Message = mongoose.model('message', {
    fname: String,
    lname: String,
    country: String,
    subject: String
})

var chatMessage = mongoose.model('chatmessage', {
    name: String,
    chatsubject: String
})


app.get('/messages',(req,res) =>{
    Message.find({}, (err, messages) =>{
        res.send(messages);
    })
    
});

app.post('/messages',(req, res) =>{

    var message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
       
        io.emit('message', req.body);
        res.sendStatus(200);
    });

});



app.post('/chatMessages',(req, res) =>{

    var chatmessage = new chatMessage(req.body);

    chatmessage.save((err) =>{
        if(err)
            sendStatus(500);
       
        io.emit('chatmessage', req.body);
        res.sendStatus(200);
    });

});

app.post('/chatMessages',(req, res) =>{

    var chatmessage = new chatMessage(req.body);
    chatmessage.save((err) =>{
        if(err)
            sendStatus(500);
       
        io.emit('chatmessage', req.body);
        res.sendStatus(200);
    });

});


io.on('connection',(socket) =>{
    console.log('A user connected');
});


mongoose.connect(dbURL,{ useMongoClient: true }, (err) =>{
    console.log("Mongo DB Connection...", err);
});

mongoose.connect(chatURL,{ useMongoClient: true }, (err) =>{
    console.log("Chat DB Connection...", err);
});


var server = http.listen(3000, ()=> {
    console.log('Server is listening on', server.address().port);
});