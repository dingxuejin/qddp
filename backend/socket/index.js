const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors')

server.listen(3001);

app.use(cors())
module.exports = io
