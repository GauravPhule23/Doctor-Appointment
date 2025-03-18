const mongoose = require("mongoose")
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require("../Services/auth");

const patientModel = new mongoose.Schema({
  fullName: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt:{type:String},
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  dpUrl: { type: String },
  role: { type: String, enum: ["Patient"], default: "Patient" },
  
});

patientModel.pre("save", async function (next) {
  const patient = this
  if (!patient.isModified("password")) return
  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac("sha256", salt).update(patient.password).digest("hex")

  this.salt = salt
  this.password = hashedPassword
})

patientModel.static("checkTokenForPatient", async function (email, password) {
  const patient = await this.findOne({ email })
  if (!patient) throw new Error("No user Found")
  const salt = patient.salt
  const hashedPassword = patient.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword) throw new Error("Incorrect password")
  const token = await createToken(patient)

  return token
})
// patientModel.methods.isPassCorrect(password){
//   const patient = await this.findOne({ email })
//   if (!patient) throw new Error("No user Found")
//   const salt = patient.salt
//   const hashedPassword = patient.password
//   const userPassword = createHmac("sha256", salt).update(password).digest("hex")
//   if (userPassword !== hashedPassword) {
//     return false
//   }
//   return true
// };
patientModel.method("isPassCorrect", async function (password){
  const patient = await this
  if (!patient) throw new Error("No user Found")
  const salt = patient.salt
  const hashedPassword = patient.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword) {
    return false
  }
  return true
})

const Patient = mongoose.model("Patient", patientModel);

module.exports = Patient