const  mongoose  = require('mongoose');

const schema = {
    original_name:String,
    genre_ids: [Number],
    name: String,
    popularity: Number,
    origin_country: [String],
    vote_count: Number,
    first_air_date: String,
    backdrop_path: String,
    original_language: String,
    id: {type: Number, required: true},
    vote_average: Number,
    overview: String,
    poster_path: String,
}
//test
const show_schema = new mongoose.Schema(schema);
const Show = mongoose.model('Show', show_schema);


module.exports = Show;