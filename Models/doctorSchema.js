const mongoose = require("mongoose")
const {createHmac, randomBytes}=require("crypto")
const {createToken} = require("../Services/auth")

const doctorModel = new mongoose.Schema({
  fullName: { type: String, reqired: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String},
  dob: { type: Date, required: true },
  ratingAvg: { type: Number, default:0},
  phone: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  dpUrl:{type:String},
  role: { type: String, enum: ["Doctor"], default: "Doctor" },
  speciality: { type: String, requiredd: true },
  experienceOf: { type: Number, required: true },
  fees: { type: Number, required: true },
  isHoliday: { type: Boolean, default: false },
  offeredSlot:[{
    dayRange :{type:String},
    eveningRange :{type:String}
  }],
  
});

doctorModel.pre("save", async function (next) {
  const doctor = this
  if (!doctor.isModified("password")) return
  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac("sha256", salt).update(doctor.password).digest("hex")

  this.salt = salt
  this.password = hashedPassword
})

doctorModel.static("checkTokenForDoctor", async function (email, password) {
  const doctor = await this.findOne({ email })
  if (!doctor) throw new Error("No user Found")
  const salt = doctor.salt
  const hashedPassword = doctor.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword) throw new Error("Incorrect password")
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