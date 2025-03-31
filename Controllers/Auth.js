const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");
const uploadOnCLoudinary = require("../Services/cloudinary");

async function SignUp(req, res) {
    if(req.body.role == "Patient"){
        
        try {
            const { fullname, email, password, dob, gender } = req.body;
            
    
            if (!fullname || !email || !password || !dob  || !gender) {
                return res.status(400).json({ error: "Please fill the required fields of Patient" });
            }

            const DpLocalPath = req.file?.path;
            const cloudinaryResult = DpLocalPath?await uploadOnCLoudinary(DpLocalPath):""
    
            const newPatient = await Patient.create({
                fullName: fullname,
                email,
                password,
                dob,
                gender,
                dpUrl:cloudinaryResult
            });
    
            res.status(201).json({ message: "Patient registered successfully", patient: await Patient.findById(newPatient._id).select("-password -salt") });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error 2", details: error.message });
        }
    }else{
        try {
            console.log("in auth controller");
            console.log(req.body);
            
            const { fullname, email, password, dob, gender, speciality, experienceOf} = req.body;
            console.log(fullname, email, password, dob, gender, speciality, experienceOf);
            
            if (!fullname || !email || !password || !speciality || !dob  || !gender || !experienceOf ) {
                return res.status(400).json({ error: "Please fill the required fields of Doctor" });
            }
            console.log("bfr dplocal path");
            const DpLocalPath = req.file?.path;
            const cloudinaryResult = DpLocalPath? await uploadOnCLoudinary(DpLocalPath):""
            console.log("aftr cloudinary");
    
            const newDoctor = await Doctor.create({
                fullname,
                email,
                password,
                dob,
                gender,
                speciality,
                experienceOf,
                dpUrl:cloudinaryResult
            });
            
            
    
            res.status(201).json({ message: "Doctor registered successfully", doctor: await Doctor.findById(newDoctor._id).select("-password -salt") });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    
    }
}

// async function doctorSignUp(req, res) {
//     }

async function Login(req, res) {
    // console.log(req);
    
    const { email, password, role } = req.body
   
    console.log("Inside login "+email+" "+password);
    if(role == "Patient"){
        console.log(email+" "+password);
        try {
            const token = await Patient.checkTokenForPatient(email, password)
            return res.status(200).cookie("token", token).json({message:token})
        } catch (error) {
            res.status(401).json({ error: "Denied authentication", details: error.message });
        }
        
    }else{
        try {
            console.log("inside login Doctor "+email+" "+password);
            
            const token = await Doctor.checkTokenForDoctor(email, password)
            return res.status(200).cookie("token", token).json({message:token})
        } catch (error) {
            res.status(401).json({ error: "Denied authentication",  details: error.message });
        }

    }
}



async function Logout(req, res) {
    res.status(200).clearCookie("token").json({message:"logged out successfully"})
}


module.exports = { SignUp, Login, Logout };
