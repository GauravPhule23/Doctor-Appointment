const mongoose = require("mongoose")

const doctorModel = new mongoose.Schema({
  doctorName: { type: String, reqired: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  role: { type: String, enum: ["Doctor"], default: "Doctor" },
  speciality: { type: String, requiredd: true },
  experienceOf: { type: Number, required: true },
  fees: { type: Number, required: true },
  isHoliday: { type: Boolean, default: false },
  offeredSlot:[{
    dayRange :{type:String},
    eveningRange :{type:String}
  }],
  bookedSlots:[{
    patientId:{type:mongoose.Types.ObjectId, ref:"Patient"},
    bookedDate:{type:Date},
    bookedSlot:{type:String}
  }],
  pendingApproval:[{
    patientId:{type:mongoose.Types.ObjectId,ref:"Patient"},
    requestedDate:{type:Date},
    requestedSlot:{type:String}
  }],
  rejectedApproval:[{
    patientId:{type:mongoose.Types.ObjectId,ref:"Patient"},
    requestedDate:{type:Date},
    requestedSlot:{type:String},
    rejectedDate:{type:Date},
    reason:{type:String}
  }]
});

const Doctor = mongoose.model("Doctor", doctorModel)

module.exports = {
  Doctor,
}