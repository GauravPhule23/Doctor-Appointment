const mongoose = require("mongoose")

const patientModel = new mongoose.Schema({
  patientName: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  role: { type: String, enum: ["Patient"], default: "Patient" },
  bookings: [{
    doctorID:{type:mongoose.Schema.Types.ObjectId, ref:"Doctor"},
    bookingDate:{type:Date},
    bookingSlot:{tyoe:String},
    isApproved:{type:String, enum:["Pending","Confirm","Rejected"], default:"Pending"}
  }]
});

const Patient = mongoose.model("Patient",patientModel);

module.exports =Patient