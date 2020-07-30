const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const secure = require('express-force-https');
const passport = require('passport');
const cookieSession = require('cookie-session');
const fs = require('fs');
const { titleCase } = require('./utils');

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


// middleware
app.use(cors()); // I'm not sure why someone would be making a CORS request to our site, but hey, it's here
app.use(bodyParser.urlencoded({ extended: false })); // body parsing
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(secure); // ensure that the connection is using https
app.use(cookieSession({ // cookies! this middleware needs to be before the passport middleware for auth cookies to work properly
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  keys: [process.env.COOKIE_SIGNATURE]
}));

// models
require('./models/rule');
require('./models/affix');
require('./models/user');

// passport security
require('./config/passport');
app.use(passport.initialize()); // start passport
app.use(passport.session()); // passport sessions for persistent login

// routes
app.use(require('./routes'));

// clientside routes (these should probably be their own file, also there's some unfortunate code duplication here with the /api/affix/:id route)
const Affix = mongoose.model('Affix');
app.get('/affixes/:id', (req, res) => {
	const filePath = path.join(__dirname+'/client/build/index.html');
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			return console.log(err);
		}
		Affix.findById(req.params.id, (err, affix) => {
	    if (err) return console.log(err);
	    
			data = data.replace(/\$OG_TITLE/g, titleCase(affix.name));
			result = data.replace(/\$OG_DESCRIPTION/g, affix.descLong);
			res.send(result);
	  });
	})
})

app.use(express.static(path.join(__dirname, "client", "build"))); // for serving up the clientside code

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// THIS SHOULD BE THE LAST ROUTE IN THE SERVER'S FILES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port);

console.log(`Server listening on ${port}`);
