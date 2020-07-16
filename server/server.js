const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const IndexService = require('../services/IndexService');
const ChatService = require('../services/ChatService');
const ProfileService = require('../services/ProfileService');
const ReviewService = require('../services/ReviewService');

const indexService = new IndexService('../data/index.json');
const chatService = new ChatService('../data/chat.json');
const profileService = new ProfileService('../data/profile.json');
const reviewService = new ReviewService('../data/reviews.json');



const routes = require('../routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.use(express.static('../static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', routes({
    indexService,
    profileService,
    chatService,
    reviewService,
}));


var dbURL = "mongodb+srv://user:user@practicedb.pdomq.mongodb.net/practiceDB?retryWrites=true&w=majority";

var Message = mongoose.model('message', {
    fname: String,
    lname: String,
    country: String,
    subject: String
})

var chatMessage = mongoose.model('chatmessage', {
    uname: String,
    chatsubject: String
})


app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })

});

app.post('/messages', (req, res) => {

    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);

        io.emit('message', req.body);
        res.sendStatus(200);
    });

});

app.get('/chatmessages', (req, res) => {
    chatMessage.find({}, (err, chatmessage) => {
        res.send(chatmessage);
    })

});

app.post('/chatmessages', (req, res) => {

    var chatmessage = new chatMessage(req.body);

    chatmessage.save((err) => {
        if (err)
            sendStatus(500);

        io.emit('chatmessage', req.body);
        res.sendStatus(200);
    });

});


io.on('connection', (socket) => {
    console.log('A user connected');
});


mongoose.connect(dbURL, {
    useMongoClient: true
}, (err) => {
    console.log("Mongo DB Connection...", err);
});




var server = http.listen(3000, () => {
    console.log('Server is listening on', server.address().port);
});