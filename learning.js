const express= require("express");
const logger = require("./middlewares/middlewareTest");
const app = express();
app.get("/", (req,res,a) =>{
    res.send("Welcome Here!")
    a();
})

app.use(logger);

app.get("/users", (req,res) =>{
    console.log("This is middleware Test!")
    res.send("Users and logged in")
})

const port=3000;
app.listen(port,()=>{
    console.log(`app learning on localhost:${port}`)
});