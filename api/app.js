'use strict';

// load modules
const express = require('express');
const morgan  = require('morgan');
const cAuth   = require('./auth');
const routes  = require('./routes');

//Parse the body
const jsonParser = require("body-parser").json;

const connection = require("./connection");

// create the Express app
const app = express();
const openRouter = express.Router();
const authRouter = express.Router();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
// setup the json parser middleware
app.use(jsonParser());

//DB
connection.exec();

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Location");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
		return res.status(200).json({});
	}
    next();
});

app.use(routes.open(openRouter));

//AUTH
app.use(cAuth);

// TODO setup your api routes here
app.use(routes.common(authRouter));

// send 404 if no other route matched
app.use(routes.notFound);

// setup a global error handler
app.use(routes.handleError);

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
