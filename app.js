const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');




const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config;
app.set('view engine', 'ejs');

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gia"
  });

conn.connect((err) =>{
    if(!err){
        console.log("Connection Successfully!")
    }
    else{
        console.error("Error occurred "+ err);
    }
})


app.use(bodyparser.urlencoded({extended: true}));
let tasks = [];
app.get('/', (req, res) => {
    res.render('home',{tasks:tasks});
})

app.post('/add',(req,res) =>{
    const newTask = req.body.task;
    tasks.push(newTask);
    res.redirect('/')
})

app.listen(port, () =>{
    console.log(`App running on localhost:${port}`);
})