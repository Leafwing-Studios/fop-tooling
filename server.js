const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const secure = require('express-force-https');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const dbRoute = process.env.MONGODB_URI || 'NO DB ROUTE PROVIDED';

// db setup
mongoose.connect(
  dbRoute,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME,
  }
);

let db = mongoose.connection;
db.once('open', () => console.log("Connected to the database"));
db.on('error', console.error.bind(console, "MongoDB connection error: "));

// CORS options
const corsOptions = {
  preflightContinue: true,
  credentials: true,
}

// middleware
app.use(cors(corsOptions)); // i don't actually know what this is
app.use(bodyParser.urlencoded({ extended: false })); // body parsing
app.use(bodyParser.json());
app.use(logger("dev")); // morgan logging i guess? i never use this T.T
app.use(express.static(path.join(__dirname, "client", "build"))); // for serving up the clientside code
app.use(secure); // ensure that the connection is using https
app.use(cookieSession({ // cookies!
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  keys:['vcxzkjvasddkvaosd'] // yeah i'm sure that's secure enough
}));

// models
require('./models/rule');
require('./models/affix');
require('./models/user');

// passport security
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(require('./routes'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// THIS SHOULD BE THE LAST ROUTE IN THE SERVER'S FILES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log(`Server listening on ${port}`);
