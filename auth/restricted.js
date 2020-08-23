module.exports = (req, res, next) => {
  // console.log('session object', req.session);
  if(req.session && req.session.user){
    next()
  }else{
    req.flash('error_msg', 'Please login first before you enter this!')
    res.redirect('/api/auth/login')
  }
  
}