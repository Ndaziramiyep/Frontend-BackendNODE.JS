function logger(req,res,callback){
    console.log("--------------------------------------")
    console.log("This is middleware!")
    callback();
}

module.exports = logger;