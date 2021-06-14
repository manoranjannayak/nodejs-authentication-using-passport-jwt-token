const jwt = require('jsonwebtoken')

module.exports = async function auth (req, res, next) {

  if(req.headers && req.headers.authorization){
    let token = req.headers.authorization.split(' ');
    token = token[1]
    if (!token) return res.status(401).send('Access Denied')

    try {
      const verifiedUser = await jwt.verify(token, process.env.JWTSECRET)
      req.user = verifiedUser
      next()
    } catch (err) {
      res.status(401).send('Invalid Token')
    }
  }else{
    return res.status(401).send('Access Denied')
  }

}

