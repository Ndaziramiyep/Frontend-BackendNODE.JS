const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');




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

app.get('/', (req, res) => {
    conn.query("select * from users",(error,results,fields)=>{
        if(results.length > 0 ){
        res.render('home',{results});
          res.end();
        }
          else{
            console.log("error occured!")
            res.end();
               }

         })

})

app.post('/', (req, res) => {
    const searchTerm = req.body.search;
    conn.query("select * from users WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?",['%'+searchTerm+'%','%'+searchTerm+'%','%'+searchTerm+'%'],(error,results,fields)=>{
        if(results.length > 0 ){
        res.render('home',{results});
          res.end();
        }
          else{
            console.log("error occured!")
            res.end();
               }

         })

})

app.post("/edituser/:id", (req, res) => {
    const delId = req.params.id;
    console.log(delId);
    conn.query("UPDATE users SET rule = ? WHERE id = ?",['removed',delId],(error,results,fields)=>{
        if(!error ){
          conn.query("select * from users",(error,results,fields)=>{
            if(results.length > 0 ){
            res.render('home',{results});
          res.end();
        }})
          // else{
          //   console.log("error occured!")
          //   res.end();
          //      }

}})
        })
app.get('/edituser/:id', (req, res) => {
    conn.query("select * from users",(error,results,fields)=>{
        if(results.length > 0 ){
        res.render('home',{results});
          res.end();
        }
          else{
            console.log("error occured!")
            res.end();
               }

         })

})

app.post('/add', async (req,res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    const date = new Date().getDate();
    const hour = new Date().getHours();
    const mins = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const password= await bcrypt.hash(req.body.password,10);
    try {
        
    } catch (error) {
        console.log(error);
    }
    const time = hour+":"+mins+":"+sec;
    const fullYear = date+"/"+month+"/"+year;
    // results.push(newTask);
    // results.push(time+" "+fullYear);
    conn.query("INSERT INTO users(id,name,email,phone,password,address,date,hour,rule)VALUES(?,?,?,?,?,?,?,?,?)",['',name,email,phone,password,address,fullYear,time,' '],(err,result,field) =>{
        if(err){
            console.log("data not inserted!"+err)
        }
        else{
            console.log("insert successfully!")
            res.redirect("/");
        }
})
})
app.use(logger);

function logger(req,res,next){
    console.log("The logger starting here!")
    next();
}

app.listen(port, () =>{
    console.log(`App running on localhost:${port}`);
})