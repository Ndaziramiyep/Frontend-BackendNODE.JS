const express= require("express");
const logger = require("./middlewares/middlewareTest");
const app = express();
const testing = require("./register")
app.get("/", (req,res,a) =>{
    res.send("Welcome Here!")
    a();
})
app.use("views","ej engine");
app.use(logger);
app.use(testing);


app.get("/users", (req,res) =>{
    console.log("This is middleware Test!")
    res.send("Users and logged in")
})

app.get("/admin", (req,res) =>{
    console.log("This is middleware Test!")
    res.send("Admin and logged in")
})

const port=3000;
app.listen(port,()=>{
    console.log(`app learning on localhost:${port}`)
});