require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var roomsRouter = require('./routes/roomsRoutes');
var cardsRouter = require('./routes/cardsRoutes');
var playersRouter = require('./routes/playersRoutes');
var actionsRouter = require('./routes/actionRoutes');
var turnsRouter = require('./routes/endTurnRoutes');
var deckRouter = require('./routes/deckRoutes');
//var switchRouter1 = require('./routes/switchRoutes1');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('VERY SECRET SECRET')); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/cards',cardsRouter);
app.use('/api/players', playersRouter);
app.use('/api/turns', turnsRouter);
app.use('/api/actions', actionsRouter);
app.use('/api/deck', deckRouter);
//app.use('/api/actions/${pId}/${selectedcards}/switch', switchRouter1);

module.exports = app;

