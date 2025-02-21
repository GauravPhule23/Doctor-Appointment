const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");

async function SignUp(req, res) {
    if(req.body.role == "Patient"){
        
        try {
            const { fullname, email, password, date, phone, gender } = req.body;
            
    
            if (!fullname || !email || !password || !date || !phone || !gender) {
                return res.status(400).json({ error: "Please fill the required fields" });
            }
    
            const newPatient = await Patient.create({
                fullName: fullname,
                email,
                password,
                dob: date,
                phone,
                gender
            });
    
            res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }else{
        try {
            const { doctorName, email, password, dob, phone, gender, speciality, experienceOf, fees } = req.body;
           
            if (!doctorName || !email || !password || !speciality || !dob || !phone || !gender || !experienceOf || !fees) {
                return res.status(400).json({ error: "Please fill the required fields" });
            }
    
            const newDoctor = await Doctor.create({
                doctorName,
                email,
                password,
                dob,
                phone,
                gender,
                speciality,
                experienceOf,
                fees
            });
    
            res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    
    }
}

// async function doctorSignUp(req, res) {
//     }

async function Login(req, res) {
    const { email, password, role } = req.body
   
    if(role == "Patient"){
        try {
            const token = await Patient.checkTokenForPatient(email, password)
            return res.status(200).cookie("token", token).json({message:token})
        } catch (error) {
            res.status(401).json({ error: "Denied authentication", details: error.message });
        }
        
    }else{
        try {
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
