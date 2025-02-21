const Rating = require("../Models/ratingSchema")

async function ratingUpdate(req,res){
    const {stars, comment} = req.body
    const createdBy = req.user._id
    const forDoctor = req.params.id
    
    if(!stars||!comment){
      res.status(400).json({message:"stars or comment is missing"})
    }
    try{

      const newRating = await Rating.create({
        createdBy,
        forDoctor,
        stars,
        comment
      });
      const totalRating= await Rating.find({forDoctor:forDoctor})
      let count = 0
      let rating = 0
      totalRating.forEach(ele => {
        rating = rating + ele.stars
        count = count + 1
      });
      const avg = rating / count
      console.log(avg)

      const oneDoc2= await Rating.findOne({forDoctor:forDoctor})
      console.log(oneDoc2)
      // let oneDoc= await Rating.findOne({forDoctor:forDoctor}).populate("forDoctor")
      let oneDoc = await Rating.findOne({ forDoctor: forDoctor }).populate({
        path: "forDoctor",
        select: "ratingAvg"  // Select only necessary fields
      });
      
      console.log(oneDoc)
      oneDoc.forDoctor.ratingAvg = avg
      oneDoc.forDoctor.ratingAvg = avg;
      await oneDoc.forDoctor.save(); // Save changes to the database


      res.status(200).json({message:"Comment added", rating:newRating})
    }catch(e){
      res.status(400).json({message:"Some error occured.", error:e})
    }

}

module.exports=ratingUpdate;