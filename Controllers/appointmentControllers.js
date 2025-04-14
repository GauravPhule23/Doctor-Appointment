// const mongoose = require("mongoose")
const Doctor = require("../Models/doctorSchema")
const Admin = require("../Models/adminSchema")
const Patient = require("../Models/patientSchema")
const Pending = require("../Models/pendingSchema")
const Cancled = require("../Models/cancledSchema")
const Appointment = require("../Models/AppointmentSchema")
const apiError = require("../Services/apiError")
const apiResponse = require("../Services/apiResponse")
const mailSender = require("../Services/mailSending")
const {canceledEmailFormat, approvedEmailFormat} = require("../Services/constanst")
const { model } = require("mongoose")


async function appointmentBooking(req, res) {
  if (req.user.role == "Patient") {
    const { AppointmentDate, startTime, endTime } = req.body
    const patient = req.user._id
    const doctor = req.params.doctorId

    const [day, month, year] = AppointmentDate.split("-").map(Number)// splits the date string using -
    const dateObj = new Date(year, month - 1, day + 1)// makes new date with info of data of datastring


    // console.log(dateObj)
    // const doctor = doctor2.slice(1,)// removes : from :id



    if (!AppointmentDate, !startTime, !endTime, !patient, !doctor) {
      res.status(401).json(
        new apiError(401, "Incomplete Data, data feilds missing")
      )
    }
    try {
      const newAppointment = await Appointment.create({
        patient,
        doctor,
        date: dateObj,
        startTime,
        endTime
      });

      const appointmentId = newAppointment._id
      Pending.create({
        appointment: appointmentId
      })
      res.status(201).json(
        new apiResponse(201, "Appointment registered please wait untill Approved", newAppointment)
      );
    } catch (error) {
      res.status(500).json(
        new apiError(500, "Internal Server Error", error.message)
      );
    }
  } else {
    res.status(401).json(
      new apiError(401, "Doctor or Admin is not authorized to book an appointment.")
    )
  }


}


async function appointmentCancle(req, res) {

  if (req.user.role != "Patient" && req.user.role != "Doctor" && req.user.role != "Admin") {
    throw new apiError(400, "Not authorized")
  }

  const Id = req.params.appointmentId
  const info = Appointment.findById(Id)

  let user
  let admin
  if (req.user.role == "Patient") {
    user = await Patient.findById(info.patient)
  } else if (req.user.role == "Doctor") {
    user = await Doctor.findById(info.doctor)
  } else if (req.user.role == "Admin") {
    admin = await Admin.findById(req.user._id)
  }
  // req.user.role == "Patient"?user = await Patient.findById(info.patient):user = await Doctor.findById(info.doctor);

  if (req.user.email == user.email || admin) {
    const reason = req.body.reason

    // Pending.findOne({appointment:Id});
    await Pending.findOneAndDelete({ appointment: Id });

    const cancle = await Appointment.findById(Id)
    cancle.status = "Cancled";
    await cancle.save()

    const appointmentCancle = await Cancled.create({
      appointment: Id,
      patient: cancle.patient,
      doctor: cancle.doctor,
      reason,
      cancledBY: req.user.role
    })
    const info = await Cancled.findById(appointmentCancle._id).populate({
      path:'appointment',
      populate:[{
        path:'patient',
        model:'Patient',
        select:'fullName email'
      },
      {
        path:'doctor',
        model:'Doctor',
        select:'fullName'
      }]
      
    })
    const cancellation = canceledEmailFormat(info)

    mailSender(info.appointment.patient.email, cancellation.subject,cancellation.bodyHtml,cancellation.bodyText)

    res.status(200).json(
      new apiResponse(200, `Appointment Cancled By ${req.user.role} and the email is sent to patient`, appointmentCancle)
    )
  } else {
    res.status(401).json(
      new apiError(401, `${req.user.fullName} is not allowed to cancle this appointment`)
    )
  }

}
// async function appointmentCancle(req, res) {
//   const Id = req.params.appointmentId
//   const reason = req.body.reason

//   // Pending.findOne({appointment:Id});
//   await Pending.findOneAndDelete({appointment:Id});

//   const cancle = await Appointment.findById(Id)
//   cancle.status = "Cancled";
//   await cancle.save()

//   const appointmentCancle =await Cancled.create({
//     appointment: Id,
//     reason,
//     cancledBY: req.user.role
//   })

//   res.status(200).json({ message: `Appointment Cancled By ${req.user.role}`, obj: appointmentCancle })
// }


async function appointmentApprove(req, res) {
  const Id = req.params.appointmentId
  const info = await Doctor.findById(Id.doctor)
  if (!info || info.email != req.user.email) {
    res.status(401).json(
      new apiError(401, `${!info ? "No doctor found to approve" : "Not authorized doctor to approve "} `)
    )
  }
  const approve = await Appointment.findById(Id).populate({
    path:'appointment',
    populate:[{
      path:'patient',
      model:'Patient',
      select:'fullName email'
    },
    {
      path:'doctor',
      model:'Doctor',
      select:'fullName'
    }]
    
  })
  approve.status = "Approved";
  await approve.save()

  
  const approvedAppointment = approvedEmailFormat(approve)

  mailSender(approve.appointment.patient.email, approvedAppointment.subject,approvedAppointment.bodyHtml,approvedAppointment.bodyText)


  res.status(200).json(
    new apiResponse(200, `Appointment Approved By ${req.user.fullName} and email is sent`)
  )
}
// async function appointmentApprove(req, res) {
//   const Id = req.params.appointmentId

//   const approve = await Appointment.findById(Id)
//   approve.status = "Approved";
//   await approve.save()



//   res.status(200).json({ message: `Appointment Approved By ${req.user.fullName}` })
// }

async function appointmentComplete(req, res) {
  const Id = req.params.appointmentId

  const info = await Doctor.findById(Id.doctor)
  if (!info || info.email != req.user.email) {
    res.status(401).json(
      new apiError(401, `${!info ? "No doctor found to approve" : "Not authorized doctor to approve "} `)
    )
  }

  const complete = await Appointment.findById(Id)
  complete.status = "Completed";
  await complete.save()



  res.status(200).json(
    new apiResponse(200, `Appointment Completed By ${req.user.fullName}`)
  )
}
// async function appointmentComplete(req, res) {
//   const Id = req.params.appointmentId

//   const complete = await Appointment.findById(Id)
//   complete.status = "Completed";
//   await complete.save()



//   res.status(200).json({ message: `Appointment Completed By ${req.user.fullName}` })
// }


module.exports = { appointmentBooking, appointmentCancle, appointmentApprove, appointmentComplete }