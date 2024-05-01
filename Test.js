const mysql =require("mysql");
const express =require("express");
const router = express.Router();
const app=express();
const bodyParser =require("body-parser");
const cors = require("cors");
const encoder = bodyParser.urlencoded();

app.use(cors());
const conn=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"gia"
});
conn.connect((error)=>{
  if(error) throw error;
  else console.log("connection successfully!");
})
app.post("/",encoder,(req,res)=>{
var email=req.body.email;
var password=req.body.password;
conn.query("select * from users where email=? and password=?",[email,password],(error,result,fields)=>{
  if(result.length > 0 ){
    res.redirect("/welcome");
    res.end();
  }
    else{
      res.send("<h1>Credentials mismatch.</h1><br> Check wel to login again!")
      res.end();

    }
    res.end();

})
});
// Creation of server using Https in node.js.
// And also for today on 11/04/2024 i have learnt many in node.js to be used for frontend and backend development.
//Also gonna be pushing more as i can to explore more which is new and advanced some how

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.get("/welcome",(req,res)=>{
  res.sendFile(__dirname+"/welcome.html");
})
const port=4500;
app.listen(port, () => {
  console.log('Server is running on http://localhost:'+port);
});

