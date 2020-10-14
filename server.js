/* Backend */

/* Modules */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

/* App setup */
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Serving React client
app.use(express.static(path.join(__dirname, '/client/build')));

server.listen(port, ()=>{
    console.log(`Server listening to port ${port}`)
});

// Server-side routing
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/client/build/index.html');
});