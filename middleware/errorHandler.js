const errHandler =(err,req, res, next) =>{
    res.send(err.message)
}

module.exports = errHandler;