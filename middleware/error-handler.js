const errorHandler = (err,req,res,next) => {
    return res.status(500).json({success:false, error:err})
}

module.exports = errorHandler;  