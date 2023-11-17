const notFound = (req,res) => {
    res.status(404).json({error: `No route exist as such`, status:404, success:false});
}

module.exports = notFound;