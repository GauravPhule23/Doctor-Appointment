const JWT = require("jsonwebtoken")

const secreteKey = process.env.JWT_SECRETE_KEY

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

  const token = await JWT.sign(payload,secreteKey,{
    expiresIn:'1d'
  })
  return token
 }else{
    const payload ={
      _id : user._id,
      fullName:user.fullName,
      role:user.role,
      dob:user.dob,
     email:user.email,
     gender:user.gender,
     DP:user.profileUrl,
   
    }
    const token = await JWT.sign(payload,secreteKey,{
      expiresIn:'1d'
    })
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