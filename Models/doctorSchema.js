const mongoose = require("mongoose")
const {createHmac, randomBytes}=require("crypto")
const {createToken} = require("../Services/auth");
const apiError = require("../Services/apiError");
const { type } = require("os");

const doctorModel = new mongoose.Schema({
  fullName: { type: String, reqired: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String},
  about:{type:String},
  dob: { type: Date, required: true },
  ratingAvg: { type: Number, default:0},
  phone: { type: String,},
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  dpUrl:{type:String},
  role: { type: String, enum: ["Doctor"], default: "Doctor" },
  speciality: { type: String, requiredd: true },
  experienceOf: { type: Number, required: true },
  fees: { type: Number,},
  isHoliday: { type: Boolean, default: false },
  offeredSlot: {
    type: [
      {
        startTime: { type: String },
        endTime: { type: String },
      },
    ],
    default: [
      { startTime: "10:00 AM", endTime: "10:30 AM" },
      { startTime: "10:30 AM", endTime: "11:00 AM" },
      { startTime: "11:00 AM", endTime: "11:30 AM" },
      { startTime: "11:30 AM", endTime: "12:00 PM" },
      { startTime: "4:00 PM", endTime: "4:30 PM" },
      { startTime: "4:30 PM", endTime: "5:00 PM" },
      { startTime: "5:00 PM", endTime: "5:30 PM" },
      { startTime: "5:30 PM", endTime: "6:00 PM" },
      { startTime: "6:00 PM", endTime: "6:30 PM" },
      { startTime: "6:30 PM", endTime: "7:00 PM" },
      { startTime: "7:00 PM", endTime: "7:30 PM" },
      { startTime: "7:30 PM", endTime: "8:00 PM" },
    ],
  },
  
});

doctorModel.pre("save", async function (next) {
  const doctor = this
  if (!doctor.isModified("password")) return
  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac("sha256", salt).update(doctor.password).digest("hex")

  this.salt = salt
  this.password = hashedPassword
})

doctorModel.static("checkTokenForDoctor", async function (email1, password) {
  // console.log(email1)
  const doctor = await this.findOne({ email:email1 })
  // console.log(doctor)
  if (!doctor) throw new apiError(404,"No user Found")
  const salt = doctor.salt
  const hashedPassword = doctor.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword) throw new apiError(404,"Incorrect password")
  const token = await createToken(doctor)
  return token
})

doctorModel.method("isPassCorrect", async function (password){
  const doctor = await this
  if (!doctor) throw new Error("No user Found")
  const salt = doctor.salt
  const hashedPassword = doctor.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword) {
    return false
  }
  return true
})

const Doctor = mongoose.model("Doctor", doctorModel)

module.exports =Doctor