const { validateToken } = require("../Services/auth")

function checkToken(cookieName){
  return async function (req,res,next){
    const tokenValue = await req.cookies[cookieName]
    if(!tokenValue){
      return next()
    }
    try {
      const payload = validateToken(tokenValue)
      req.user = payload

    } catch (error) {
      
    }
    next()
  }
}

module.exports = checkToken
//module.exports =checkToken;