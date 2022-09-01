const mongoose = require("mongoose");

let mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}cluster0.sm6ne.mongodb.net/MeTime?retryWrites=true&w=majority`;

module.exports = mongoose.connect(mongoDB);




