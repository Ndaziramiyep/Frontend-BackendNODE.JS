// import { createPool } from 'mysql';
// // import { c } from 'express';
// const { createPool } =require("mysql");
// const { createConnection } =require("mysql");

// const  c= require('express');
// const useState =require("react");
const  readFile= require('fs');
const  os= require('os');
// console.log(os.freemem());
// console.log(os.totalmem());
// console.log(fs.readFile());

// import { readFile } from 'node:fs';

readFile('/welcome.html', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// const {createPool}= require('mysql');
// const pool=createConnection({
// const pool=createPool({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"gia",
//     connectionLimit:10
// });
// // pool.query("insert into users(id,name,email,phone,password,address,rule) Values('','Akaliza','isimbi@gmail.com','100','1234','Kigali','admin')",(err,result,fields)=>{
// pool.query("select * from users",(err,result,fields)=>{
//     if(err){
//     return console.log(err);
// }
//    else{
//    return console.log(result);
// }
// })