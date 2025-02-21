const Admin = require("../Models/adminSchema");

async function SignUp(req, res) {


  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "Please fill the required fields" });
    }

    const newAdmin = await Admin.create({
      fullName: fullname,
      email,
      password
    });

    res.status(201).json({ message: "Admin registered successfully", patient: newAdmin });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }



}




async function Login(req, res) {
  const { email, password, role } = req.body

  try {
    const token = await Admin.checkTokenForAdmin(email, password)
    return res.status(200).cookie("token", token).json({ message: token })
  } catch (error) {
    res.status(401).json({ error: "Denied authentication", details: error.message });
  }



}




async function Logout(req, res) {
  res.status(200).clearCookie("token").json({message:"loged out sucessfully"})
}


module.exports = { SignUp, Login, Logout };
