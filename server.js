const express = require('express');
const bodyParser = require('body-parser');
const {MONGO_URI} = require('./src/config/keys');
const mongoose = require('mongoose');
require('./models/Factory');
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./routes/index')(app, io);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build','index.html'))
  });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

//Export the server for testing purposes
if (process.env.NODE_ENV !== 'production') {
  module.exports = app;
}