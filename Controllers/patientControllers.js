const Patient = require("../Models/patientSchema")
const Doctor = require("../Models/doctorSchema")
// const Pending = require("../Models/pendingSchema")
const Appointment = require("../Models/AppointmentSchema")
const Cancled = require("../Models/cancledSchema")


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
  if (req.user.role == "Patient" || req.user.role == "Admin") {
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
  }else{
    res.status(401).json({message:"Not authorized to change details of the patients"})
  }
}

async function getDoctors(req,res){
  const doctorList = await Doctor.find({}).select("-password -salt")
  res.status(200).json(doctorList)
}

async function getDoctor(req,res){
  const doctorInfo = await Doctor.findById(req.params.id).select("-password -salt")
  console.log(doctorInfo)
  res.status(200).json(doctorInfo)
}

async function PendingAppointment(req,res){
  const pendings = await Appointment.find({patient:req.user._id,status:"Pending"})
  console.log(pendings)
  res.status(200).json(pendings)
}

async function approvedAppointment(req,res){
  const approved = await Appointment.find({patient:req.user._id, status:"Approved"})
  console.log(approved)
  res.status(200).json(approved)
}
async function cancledAppointment(req,res){
  const cancled = await Cancled.find({patient:req.user._id}).populate("appointment")
  console.log(cancled)
  res.status(200).json(cancled)
}
async function completedAppointment(req,res){
  const complete = await Appointment.find({patient:req.user._id})
  console.log(complete)
  res.status(200).json(complete)
}

module.exports = {updatePatient, getDoctors, getDoctor, PendingAppointment, approvedAppointment, cancledAppointment, completedAppointment}