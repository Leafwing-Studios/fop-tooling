const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('logger');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const dbRoute = process.env.MONGODB_URI || '';

require('dotenv').config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// db setup
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once('open', () => console.log("Connected to the database"));
db.on('error', console.error.bind(console, "MongoDB connection error: "));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log(`Password generator listening on ${port}`);
