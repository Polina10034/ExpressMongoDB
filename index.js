const express = require('express');
const morgan = require('morgan');
const ctrl = require('./controller');

const app = express();
const port = process.env.PORT || 3000;
app.set('json spaces', 40);

app.use(express.json());
app.use(express.urlencoded({extended: true }));


app.get('/shows', ctrl.getAllShows);
app.get('/show/:id', ctrl.getShow);
app.put('/editShow/:id', ctrl.editShow);
app.post('/postShow', ctrl.addShow);
app.post('/removeShow', ctrl.removeShow);

app.use('/', ctrl.defualPage);
app.use( '*', ctrl.notFound);
app.use( ctrl.serverErr);


app.listen(port, () => console.log('Express servr ready for requests on: ', port));
