const { validateToken } = require("../Services/auth")

function checkToken(cookieName){
  return async function (req,res,next){
    const tokenValue = await req.cookies[cookieName]
    if(!tokenValue){
      console.log("no cookie")
      return next() // new commit
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