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
            const {title = null, body = null } = req. body;
            const result = await Show.updateOne({id}, {body, title});

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

            const post = new Show({original_name, genre_ids, name, popularity, origin_country, vote_count,first_air_date, backdrop_path, original_language, id, vote_average, overview, poster_path});
            const result = await post.save();

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

    }
}