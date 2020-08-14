module.exports = (req, res, next) => {
  console.log('session object', req.session);
  if(req.session && req.session.user){
    next()
  }else{
    res.status(401).json({ message: "Please login first before you enter this!" })
  }
  
}