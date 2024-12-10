const express = require("express");
const connectToMongo = require("./database");
const productRoutes = require('./routes/productRoutes')

const app = express();
const Port = 8000;

// connection to db
connectToMongo();

app.use("/api/product",productRoutes);
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Server is Started");
})

app.listen(Port, () => {
    console.log(`Server is runing on port ${Port}`)
})