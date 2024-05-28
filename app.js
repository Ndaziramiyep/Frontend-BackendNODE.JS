const express = require('express');
const bodyparser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs')


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