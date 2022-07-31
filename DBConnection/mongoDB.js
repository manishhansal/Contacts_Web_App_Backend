require('dotenv').config();
const mongoose = require('mongoose');

class Mongo {

    constructor() {
        this.createMongoConnection();
    }

    createMongoConnection() {
        mongoose.connect(`mongodb+srv://movieDatabase:xaJwmBE6Go62IH0a@cluster0.mgnrv.mongodb.net/?retryWrites=true&w=majority`)


        mongoose.connection.once('open', () => {
            console.log("MongoDB is connected");
        })
        mongoose.connection.on('error', () => {
            console.log("Error occured in mongoDB connection");
        })
    }
}

module.exports = Mongo;