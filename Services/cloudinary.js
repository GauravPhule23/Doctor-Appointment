// import { v2 as cloudinary } from 'cloudinary';
const {v2} = require("cloudinary")
const fs  = require("fs")

v2.config({ 
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
 api_key: process.env.CLOUDINARY_API_KEY, 
 api_secret: process.env.CLOUDINARY_API_SECRETE 
 });

async function uploadOnCLoudinary(localPath){
  try {
    if(!localPath) return null
    // uploading the image on the cloudinary 
    const result  = await v2.uploader.upload(localPath,{
      resource_type:"image",
    })
    console.log("Image uploaded sucessfully ", result, " url of cloudinary : ",result.url)

    fs.unlinkSync(localPath) // Unlinks the file form the local server due to Succesful uploadation on the cloudinary
    return result.url
  } catch (error) {
    fs.unlinkSync(localPath) // Unlinks the file form the local server due to failed uploadation on the cloudinary
    return null
  }
}


module.exports = uploadOnCLoudinary