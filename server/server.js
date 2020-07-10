var express = require('express');
var app = express();

app.use(express.static('../static'))

var messages = [ 
    {name:'Emily', message:'Hi'},
    {name:'Alex', message:'Hey'},
]

app.get('/messages',(req, res) =>{
    res.send(messages)
})
var server = app.listen(3000, ()=> {
    console.log('Server is listening on', server.address().port);
});