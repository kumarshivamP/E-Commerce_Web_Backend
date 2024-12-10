require('dotenv').config();
const mongoose = require("mongoose");


const connectToMongo = () => {
    mongoose.connect("mongodb+srv://shivam:rWYhxEuzYB9C8xXI@cluster0.bbslhk5.mongodb.net/STube?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("DB CONNECTED");
        })
        .catch((e) => {
            console.log("Error", e);
        });
};

module.exports = connectToMongo;