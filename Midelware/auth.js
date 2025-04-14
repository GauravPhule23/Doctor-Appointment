const { validateToken } = require("../Services/auth")

function checkToken(cookieName){
  return async function (req,res,next){
    const tokenValue = await req.cookies[cookieName]
    if(!tokenValue){
      const authHeader = req.headers.authorization;
      tokenValue = authHeader.split(" ")[1];
    }
    if(!tokenValue){
      return next()
    }
    try {
      
      const payload = validateToken(tokenValue)
      console.log("cookie got and in req.user")
      req.user = payload
      console.log(req.user)
      
    } catch (error) {
      
    }
    next()
  }
}

module.exports = checkToken
//module.exports =checkToken;