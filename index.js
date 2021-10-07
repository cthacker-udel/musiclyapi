// OFFICIAL CONSTANTS
const express = require('express');

//const config = require('config');

const app = express();

const songsRouter = require('./routes/songs');

const logger = require('./middleware/logger');
const auth = require('./middleware/authentication');
//const morgan = require('morgan');
//const startupDebugger = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');

const port = process.env.PORT | 3000;

app.use(express.json());

app.use('/api/songs',songsRouter);
app.use(logger);
//app.use(morgan);
app.use(auth);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});