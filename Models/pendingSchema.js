const mongoose = require("mongoose")

const pendingSchema = new mongoose.Schema({
  appointment:{type:mongoose.Schema.Types.ObjectId, ref:"Appointment",required:true}

})

const Pending = mongoose.model("Pending",pendingSchema)

module.exports = Pending;