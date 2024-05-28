const express = require('express');
const bodyparser = require('body-parser');


const app = express();
app.set('views engine', 'ejs')

app.use(bodyparser.urlencoded({extended: true}));
let tasks = [];
app.get('/', (req, res) => {
    res.render('home',{tasks:tasks});
})

app.post('/add',(req,res) =>{
    const {task} = req.body;
    tasks.push(task);
    res.render('/')
})