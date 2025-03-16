const JWT = require("jsonwebtoken")

const secreteKey = "DocUser123542"

async function createToken(user){
 if(user.role == "Doctor"){
  const payload ={
    _id : user._id,
    fullName:user.fullName,
    role:user.role,
    rating:user.ratingAvg,
    email:user.email,
    phone:user.phone,
    gender:user.gender,
    DP:user.profileUrl,
    speciality:user.speciality,
    experience:user.experienceOf,
    fees:user.fees
  }

  const token = await JWT.sign(payload,secreteKey)
  return token
 }else{
    const payload ={
      _id : user._id,
      fullName:user.fullName,
      role:user.role,
     email:user.email,
     gender:user.gender,
     DP:user.profileUrl,
   
    }
    const token = await JWT.sign(payload,secreteKey)
    return token
 }
}

function validateToken(token){
  const payload = JWT.verify(token,secreteKey)
  return payload
}

module.exports={
  createToken,
  validateToken
}