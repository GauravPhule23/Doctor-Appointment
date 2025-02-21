const {Schema,model} = require("mongoose")

const ratingSchema = new Schema({
  createdBy:{type:Schema.Types.ObjectId, required:true, ref:"Patient"},
  forDoctor:{type:Schema.Types.ObjectId, required:true, ref:"Doctor"},
  stars:{type:Number, required:true},
  comment:{type:String,required:true}
})

const Rating=model("Ratings",ratingSchema)

module.exports=Rating