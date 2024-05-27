

exports.view((req,res) =>{
        res.sendFile(path.join(__dirname,"welcome.html"));
})