async function forPatient(req,res,next){
  
  console.log(req.user.role)
  if(req.user.role == "Doctor" || req.user.role == "Admin"){
    // console.log("in in")
    return next()
  }else{
    // console.log("in in in")
    return res.status(400).json({message:`${req.user.role} not Authorized to hit this route`})
  }

}

module.exports = forPatient