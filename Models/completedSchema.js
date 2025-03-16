const mongoose = require("mongoose")

const completedSchema = new mongoose.Schema({
  appointment:{type:mongoose.Schema.Types.ObjectId, ref:"Appointment",required:true}

})

const Completed = mongoose.model("Completed",completedSchema)

module.exports = Completed;