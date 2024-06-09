const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const cors = require("cors")
const fs = require('fs');
const archiveManager = require('./archiveManager');

const app = express();
app.use(express.static('public'))
app.use(cors())
const server = createServer(app);
const io = new Server(server);  

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });

app.get('/data',(req,res) => {
  let resp
  try{
   resp = archiveManager.Pull("./server/data.json")
  }catch{
   resp = {invalidHost : true}
  }
  res.send(resp)
})

app.get('/makeMeHost',async (req,res) => {
  itsOkay = await archiveManager.Put('./server/data.json',{"isHoster":true,"users": {}})
  res.send({err:false})
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = server