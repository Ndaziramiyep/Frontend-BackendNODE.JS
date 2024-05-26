const express = require("express");
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"welcome.html"))
})
app.get("/data/database",(req,res) => {
    const members = [{Id:"001", Name:"Patrick NDAZIRAMIYE", Salary:"1M", Age:"20"},
    {Id:"002", Name:"Patrick NDAZIRAMIYE1", Salary:"2M", Age:"30"},
    {Id:"003", Name:"Patrick NDAZIRAMIYE3", Salary:"3M", Age:"40"},
    ]
    res.json(members);
})
app.listen(port,()=>{
    console.log(`server is running on localhost:${port}`);
})
