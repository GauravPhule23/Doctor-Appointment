async function forPatient(req,res,next){
  
    console.log(req.user.role)
    if(req.user.role == "Patient" || req.user.role == "Admin"){
      
      return next()
    }else{
      
      return res.status(400).json(new apiError(400,"Not eligible",`${req.user.role} not Authorized to hit this route`))
    }
  
}

module.exports = forPatient