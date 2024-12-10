const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const connectToMongo = require("./database");
const productRoutes = require('./routes/productRoutes')

const app = express();
const Port = 8000;

// connection to db
connectToMongo();

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/product",productRoutes);

app.get("/",(req,res)=>{
    res.send("Server is Started");
})

app.listen(Port, () => {
    console.log(`Server is runing on port ${Port}`)
})