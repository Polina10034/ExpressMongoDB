/* Mongoose connection using events */

const mongoose = require('mongoose');
const Show = require('./show');

const { DB_USER, DB_PASS, DB_HOST } = require('./constants');

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;

const options = {

useCreateIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true,

};




module.exports = {

    defualPage(req, res, next){
        res.status(200).send( 'Home Page.')
    },
    getAllShows(req, res, next){
    mongoose
        .connect(url, options)
        // .then(db => console.log(`connected to: ${db.connection.name}`))
        .then(async () => {

            const result = await Show.find({});

            if(result) 
                res.json(result);
                // res.status(200).send('Ok');
            
            else res.status(404).send('not found');
        })
        .catch(err => {
            console.error('connection error: ', err);
            res.status(500).send(err.message)
        });

    },
    getShow(req, res, next){
        mongoose
        .connect(url, options)
        // .then(db => console.log(`connected to: ${db.connection.name}`))
        .then(async () => {
            const {id = null} = req.params
            const result = await Show.findOne({id});

            if(result) res.json(result);
            else res.status(404).send('not found');
        })
        .catch(err => {
            console.error('connection error: ', err);
            res.status(500).send(err.message)
        });

    },

    editShow(req, res, next){
        mongoose
        .connect(url, options)
            .then(async () => {
            const {id = null} = req.params;
            var objForUpdate = {};
            if(req.body.genre_ids) objForUpdate.genre_ids = req.body.genre_ids;
            if(req.body.origin_country) objForUpdate.origin_country = req.body.origin_country;
            if(req.body.original_name) objForUpdate.original_name = req.body.original_name;
            if(req.body.first_air_date) objForUpdate.first_air_date = req.body.first_air_date;
            if(req.body.name) objForUpdate.name = req.body.name;
            if(req.body.original_language) objForUpdate.original_language = req.body.original_language;
            if(req.body.backdrop_path) objForUpdate.backdrop_path = req.body.backdrop_path;
            if(req.body.popularity) objForUpdate.popularity = req.body.popularity;
            if(req.body.vote_count) objForUpdate.vote_count = req.body.vote_count;
            if(req.body.vote_average) objForUpdate.vote_average = req.body.vote_average;
            if(req.body.overview) objForUpdate.overview = req.body.overview;
            if(req.body.poster_path) objForUpdate.poster_path = req.body.poster_path;

            objForUpdate = { $set: objForUpdate};
            const result = await Show.updateOne({id}, objForUpdate);

            if(result) res.json(result);
            else res.status(404).send('not found');
        })
        .catch(err => {
            console.error('connection error: ', err);
            res.status(500).send(err.message)
        });

    },
    addShow(req, res, next){
         mongoose
        .connect(url, options)
        .then(async () => {
            const{
                original_name = null,
                genre_ids= null,
                name = null,
                popularity = null,
                origin_country = null,
                vote_count = null,
                first_air_date = null,
                backdrop_path =null,
                original_language = null,
                id = null,
                vote_average = null,
                overview = null,
                poster_path = null
                
            } = req.body;

            const show = new Show({original_name, genre_ids, name, popularity, origin_country, vote_count,first_air_date, backdrop_path, original_language, id, vote_average, overview, poster_path});
            const result = await show.save();

            if(result) res.json(result);
            else res.status(404).send('not found');
        })
            .catch(err => {
                console.error('connection error: ', err);
                res.status(500).send(err.message)
            });

    },
    removeShow(req, res, next){
        mongoose
        .connect(url, options)
        .then(async () => {
            const {id = null} = req.body;
            const result = await Show.deleteOne({id});

            if(result){
                res.json(result);
            } 
            else res.status(404).send('not found');
        })
        .catch(err => {
            console.error('connection error: ', err);
            res.status(500).send(err.message)
        });

    },

    
    

    notFound(req, res, next) {
         res.status(404).send({ message: 'Route'+req.url+' Not found.' });
      },

    serverErr(error, req, res, next){
        res.status(500).send('500: Internal Server Error', error);
    }


    
}