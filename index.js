const express = require('express');
const morgan = require('morgan');
const ctrl = require('./controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get('/shows', ctrl.getAllShows);
app.get('/show/:id', ctrl.getShow);
app.put('/show/:id', ctrl.editShow);
app.post('/postShow', ctrl.addShow);
app.post('/removeShow', ctrl.removeShow);

app.listen(port, () => console.log('Express servr ready for requests on: ', port));
