const Patient = require("../Models/patientSchema")


async function updatePatientName(fullName, user){
  await Patient.findByIdAndUpdate(user._id,{
    $set:{
      fullName
    }
  })
}
async function updatePatientDob(dob, user){
  await Patient.findByIdAndUpdate(user._id,{
    $set:{
      dob
    }
  })
}
async function updatePatientPhone(phone, user){
  await Patient.findByIdAndUpdate(user._id,{
    $set:{
      phone
    }
  })
}
async function updatePatientpassword(password, user, oldPassword){
  
    const patient = await Patient.findById(user._id)
    const ispassValid = await patient.isPassCorrect(oldPassword)
    if(!ispassValid){
  
      throw new Error("old password does not match")
    }
    patient.password = password;
    patient.save()
  
  
}



async function updatePatient(req,res){
  try {
    const {fullName, newpassword, oldPassword, dob, phone} = req.body
    
    if(fullName != req.user.fullName){
      fullName?updatePatientName(fullName,req.user):console.log("no change in name")
    }
    if(dob != req.user.dob){
      dob?updatePatientDob(dob,req.user):console.log("no change in dob")
    }
    if(phone != req.user.phone){
      phone?updatePatientPhone(phone,req.user):console.log("no change in phone")
    }
    const updateUser = await Patient.findById(req.user._id)
    // console.log(updateUser)
    const forPass = await updateUser.isPassCorrect(newpassword)
    // console.log(forPass)
    if(!(forPass)){
      console.log("in pass block")
      newpassword?updatePatientpassword(newpassword,req.user,oldPassword):console.log("no change in password")
      console.log("after pass exe")
    }
    res.status(200).json({message:"Updation sucessfull"})
  } catch (error) {
    res.status(500).json({message:"error in updation "})
  }
}


module.exports = updatePatient