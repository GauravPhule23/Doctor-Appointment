const mongoose = require("mongoose");

function conectionDatabase(url){
 mongoose.connect(url,"/doctorAppointmentV1");
}

module.exports={
conectionDatabase,

}