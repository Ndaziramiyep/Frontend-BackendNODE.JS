const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');




const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
app.set('view engine', 'ejs');

const conn=mysql.createConnection({
    host:process.env.HOST_NAME,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DB_NAME
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
    res.render('home',{tasks});
})

app.post('/add',(req,res) =>{
    const newTask = req.body.task;
    const date = new Date().getDate();
    const hour = new Date().getHours();
    const mins = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const time = hour+":"+mins+":"+sec;
    const fullYear = date+"/"+month+"/"+year;
    // tasks.push(newTask);
    // tasks.push(time+" "+fullYear);
    conn.query("INSERT INTO tasks(id,task,date,hour)VALUES(?,?,?,?)",['',newTask,fullYear,time],(err,result,field) =>{
        if(err){
            console.log("data not inserted!"+err)
        }
        else{
            console.log("insert successfully!")
            conn.query("select * from tasks",(error,result,fields)=>{
                if(result.length > 0 ){
                  res.redirect("/");
                 tasks= result;
                  res.end();
                }
                  else{
                    console.log("error occured!")
                    res.end();
                       }

                 })
        }
    })
})

app.listen(port, () =>{
    console.log(`App running on localhost:${port}`);
})