const mysql =require("mysql");
const express =require("express");
const router = express.Router();
const app=express();
const bodyParser =require("body-parser");
const cors = require("cors");
const encoder = bodyParser.urlencoded();

// app.use(cors());
 const conn=mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   database:"gia"
 });

// conn.connect((error) => {
//   if(error) console.log(error);
//   else console.log("Connection successfully!");
// })

 app.post("/login",encoder,(req,res)=>{
 var email=req.body.email;
 var password=req.body.password;
 conn.query("select * from users where email=? and password=?",[email,password],(error,result,fields)=>{
   if(result.length > 0 ){
     res.redirect("dashboard");
     res.end();
   }
     else{
       res.redirect("register")
       res.end();
          }
     res.end();
    })
 });

 app.post("/register", encoder, (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var phone = req.body.phone;
  const querry = "INSERT INTO users(id, email, phone, password, address, rule) VALUES(' ',?,?,?,'Kigali','user')";
  conn.query(querry,[username,email,phone],(error,result,field) => {
    if(error) throw error;
    else res.redirect("/login");
  })
 })

// Creation of server using Https in node.js.
// And also for today on 11/04/2024 i have learnt many in node.js to be used for frontend and backend development.
//Also gonna be pushing more as i can to explore more which is new and advanced some how

app.get("/",(req,res)=>{
  res.render("index.ejs")
})

app.get("/login",(req,res)=>{
  res.sendFile(__dirname+"/login.ejs");
})

app.get("/register",(req,res)=>{
  res.sendFile(__dirname+"/register.ejs");
})
app.get("/dashboard",(req,res)=>{
  res.sendFile(__dirname+"/dashboard.ejs")
})

const port=5000;
app.listen(port, () => {
  console.log('Server is running on http://localhost:'+port);
});

