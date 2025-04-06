const Admin = require("../Models/adminSchema");
const apiError=require("../Services/apiError")
const apiResponse=require("../Services/apiResponse")

async function SignUp(req, res) {


  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json(new apiError(404,"Fields Missing",`Please fill the required fields`));
    }

    const newAdmin = await Admin.create({
      fullName: fullname,
      email,
      password
    });
    const NewAdmin = Admin.findById(newAdmin._id).select("-password -salt")
    res.status(201).json(new apiResponse(201,"Admin Created Successfully",NewAdmin));
  } catch (error) {
    res.status(500).json(new apiError(500,"internal Server Error",error.message));
  }



}




async function Login(req, res) {
  const { email, password, role } = req.body

  try {
    const token = await Admin.checkTokenForAdmin(email, password)
    return res.status(200).cookie("token", token).json(new apiResponse(200,"Admin LoggedIn",token))
  } catch (error) {
    res.status(401).json(new apiError(401,"Denied authentication",error));
    
  }



}




async function Logout(req, res) {
  res.status(200).clearCookie("token").json(new apiResponse(200,"Admin Logged out",token))
}


module.exports = { SignUp, Login, Logout };
