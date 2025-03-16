const mongoose = require("mongoose")

const approvedSchema = new mongoose.Schema({
 appointment:{type:mongoose.Schema.Types.ObjectId, ref:"Appointment",required:true}

})

const Approved = mongoose.model("Approved",approvedSchema)

module.exports = Approved;