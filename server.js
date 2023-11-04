const path = require('path');
const express = require('express');
require('express-async-errors');
const mongo = require('mongodb');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const { dbNotInit } = require('./error');
const { configDotenv } = require('dotenv');
const connectDB = require('./config/db');

// connectDB();

//load config
configDotenv({path: './config/.env'});

//passport config
require('./config/passport')(passport);

const app = express();


const port = 3000;

mongodb.initDb((err, mongodb) => {
  if (err) {
    throw new dbNotInit(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

const errorHandling = (err, req, res, next) => {
  res.json({
    code: err.statusCode,
    msg: err.message,
    success: false,
  });
};

//loging
app.use(morgan('dev'));

//body parser
app.use(bodyParser.json());

//init error handling
app.use(errorHandling);

//method override
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    };
  })
);

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs');

// Handlebars
const hbs = exphbs.create({
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  },
  defaultLayout: 'main',
  extname: '.hbs',
  callback: () => {
    console.log('in handlebars');
  }
  })
app.engine(
  '.hbs',
  hbs.engine
);
app.set('view engine', '.hbs');

//sessions
app.use(
  session({
    secret: 'cse341-p02',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Orgin', 'https://cse341-p02-76pk.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

//routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

