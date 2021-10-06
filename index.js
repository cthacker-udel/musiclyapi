// OFFICIAL CONSTANTS

const express = require('express');

const Joi = require('joi');

const config = require('config');

const app = express();

const logger = require('./logger');
const auth = require('./authentication');
const morgan = require('morgan');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const port = process.env.PORT | 3000;

app.use(express.json());
app.use(logger);
app.use(morgan);
app.use(auth);

const music = Joi.object({

    title: Joi.string().min(1).required(),
    genre: Joi.string().min(1).required(),

});

const songs = [];

// OFFICIAL CONSTANTS

app.get('/api/songs',(req,res) => {

    if(songs.length === 0){
        return res.status(200).send({'Result': 'There are no songs stored in the database'});
    }
    else{
        return res.status(200).send(songs);
    }

});

app.get('/api/songs/:id',(req,res) => {

    const song = songs.find(e => e.id === parseInt(req.params.id));

    if(song === undefined){
        // song not found
        return res.status(404).send({'Result': 'Song unable to be found'});
    }
    else{
        return res.send(song);
    }

});

app.get('/api/songs/byGenre/:genreType',(req,res) => {

    const songs = songs.filter(e => e.genre === req.params.genreType);

    if(songs.length === 0){
        return res.status(404).send(`No songs of genre ${req.params.genreType} in database`);
    }
    else{
        return res.send(songs);
    }

});

app.get('/api/songs/byTitle/:titleName',(req,res) => {

    const theSong = songs.find(e => e.title === req.params.titleName);

    if(theSong === undefined){
        return res.status(404).send(`The song with the title ${req.params.titleName} is unable to be found`);
    }
    else{
        return res.send(theSong);
    }

});




app.listen(port, () => {
    console.log(`listening on port ${port}`);
});