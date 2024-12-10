const express = require("express");

const app = express();
const Port = 8000;

app.get("/",(req,res)=>{
    res.send("Server is Started");
})

app.listen(Port, () => {
    console.log(`Server is runing on port ${Port}`)
})