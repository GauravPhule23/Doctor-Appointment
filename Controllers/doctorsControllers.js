
const Doctor = require("../Models/doctorSchema")
// const Pending = require("../Models/pendingSchema")
const Appointment = require("../Models/AppointmentSchema")
const Cancled = require("../Models/cancledSchema")
const apiError = require("../Services/apiError")
const apiResponse = require("../Services/apiResponse")


async function updateDoctortName(fullName, user){
  await Doctor.findByIdAndUpdate(user._id,{
    $set:{
      fullName
    }
  })
}
async function updateDoctorDob(dob, user){
  await Doctor.findByIdAndUpdate(user._id,{
    $set:{
      dob
    }
  })
}
async function updateDoctorPhone(phone, user){
  await Doctor.findByIdAndUpdate(user._id,{
    $set:{
      phone
    }
  })
}
async function updateDoctorpassword(password, user, oldPassword){
  
    const patient = await Doctor.findById(user._id)
    const ispassValid = await patient.isPassCorrect(oldPassword)
    if(!ispassValid){
  
      throw new apiError(400,"old password does not match")
    }
    patient.password = password;
    patient.save()
  
  
}

async function updateDoctor(req,res){
  
    try {
      const {fullName, newpassword, oldPassword, dob, phone} = req.body
      
      if(fullName != req.user.fullName && fullName){
        updateDoctortName(fullName,req.user)
     }
      if(dob != req.user.dob){
        dob?updateDoctorDob(dob,req.user):console.log("no change in dob")
      }
      if(phone != req.user.phone){
        phone?updateDoctorPhone(phone,req.user):console.log("no change in phone")
      }
      const updateUser = await Doctor.findById(req.user._id)
      // console.log(updateUser)
      const forPass = await updateUser.isPassCorrect(newpassword)
      // console.log(forPass)
      if(!(forPass)){
        console.log("in pass block")
        newpassword?updateDoctorpassword(newpassword,req.user,oldPassword):console.log("no change in password")
        console.log("after pass exe")
      }
      res.status(200).json(new apiResponse(200,"Updation sucessfull"))
    } catch (error) {
      res.status(500).json(new apiError(500,"error in updation ",error.message))
    }
  }


async function PendingAppointment(req,res){
  const pendings = await Appointment.find({doctor:req.user._id,status:"Pending"})
  console.log(pendings)
  res.status(200).json(new apiResponse(200,"Pending appointments",pendings))
}

async function approvedAppointment(req,res){
  const approved = await Appointment.find({doctor:req.user._id, status:"Approved"})
  console.log(approved)
  res.status(200).json(new apiResponse(200,"approved appointments",approved))
}
async function cancledAppointment(req,res){
  const cancled = await Cancled.find({doctor:req.user._id}).populate("appointment")
  console.log(cancled)
  res.status(200).json(new apiResponse(200,"cancled appointments",cancled))
}
async function completedAppointment(req,res){
  const complete = await Appointment.find({doctor:req.user._id})
  console.log(complete)
  res.status(200).json(new apiResponse(200,"completed appointments",complete))
}

async function editAbout(req,res){
  const about = req.body.about
  if(!about || about == " "){
    return res.status(404).json(new apiError(400,"No about provided"))
  }

  try {
    await Doctor.findByIdAndUpdate(req.user._id,{
      $set:{
        about
      }
    })
    res.status(200).json(new apiResponse(200,"Updated About Us"))
  } catch (error) {
    console.log(error)
    res.status(500).json(new apiError(500,"Internal Server Error",error))
  }
}

module.exports = {updateDoctor, PendingAppointment, approvedAppointment, cancledAppointment, completedAppointment, editAbout}