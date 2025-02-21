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

      res.status(200).json({message:"Comment added", rating:newRating})
    }catch(e){
      res.status(400).json({message:"Some error occured.", error:e})
    }

}

module.exports=ratingUpdate;