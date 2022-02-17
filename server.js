const express = require("express");
const app = express();
var fs = require('fs');
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
});
let i = 0;

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('room',{roomId: '12345'});
});

io.on("connection", (socket) => {
    socket.on('radio', function(blob) {
        // can choose to broadcast it to whoever you want
        console.log(blob);
        
        let fileName = "file"+i+".ogg";
        i+=1;
        console.log(fileName);
        fs.writeFile(`./audio/${fileName}`,blob,(err)=>{
            if (err) {
                console.log(err.message);
            }
        });
        // var arrayBuffer = new Blob([blob], { 'type' : 'audio/ogg; codecs=opus' });

    });
});

server.listen(PORT, ()=>{
    console.log('Server started on port: ' + PORT);
});