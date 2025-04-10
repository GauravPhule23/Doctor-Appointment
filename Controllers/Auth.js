const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");
const uploadOnCLoudinary = require("../Services/cloudinary");
const apiError = require("../Services/apiError");
const apiResponse = require("../Services/apiResponse");

async function SignUp(req, res) {
    if(req.body.role == "Patient"){
        
        try {
            const { fullname, email, password, dob, gender } = req.body;
            
    
            if (!fullname || !email || !password || !dob  || !gender) {
                return res.status(400).json(new apiError(404,"feilds missing","Please fill the required fields of Patient"));
                
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
    
            res.status(201).json(new apiResponse(201,"Patient registered successfully",await Patient.findById(newPatient._id).select("-password -salt")));
            
        } catch (error) {
            res.status(500).json(new apiError(500,"Internal Server Error",error.message));
        }
    }else{
        try {
            console.log("in auth controller");
            console.log(req.body);
            
            const { fullname, email, password, dob, gender, speciality, experienceOf} = req.body;
            console.log(fullname, email, password, dob, gender, speciality, experienceOf);
            
            if (!fullname || !email || !password || !speciality || !dob  || !gender || !experienceOf ) {
                return res.status(400).json(new apiError(404,"missing feilds","Please fill the required fields of Doctor"));
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
            
            
    
            res.status(201).json(new apiResponse(201,"Doctor registered successfully",await Doctor.findById(newDoctor._id).select("-password -salt")));
        } catch (error) {
            res.status(500).json(new apiError(500,"Internal Server Error",error.message));
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
            return res.status(200).cookie("token", token, {
                sameSite: 'None',      
                secure: true,          
                maxAge: 86400000,
                expires: new Date(Date.now() + 86400000),  
                domain: 'quickcare-henna.vercel.app',    
                httpOnly: true        
            }).json(new apiResponse(200, "Patient Logged in successfully", token));
        } catch (error) {
            res.status(401).json(new apiError(401,"Denide Authentication",error.message));
            
        }
        
    }else{
        try {
            console.log("inside login Doctor "+email+" "+password);
            
            const token = await Doctor.checkTokenForDoctor(email, password)
            return res.status(200).cookie("token", token, {
                sameSite: 'None',      
                secure: true,          
                maxAge: 86400000,
                expires: new Date(Date.now() + 86400000),   
                domain: 'quickcare-henna.vercel.app',   
                httpOnly: true        
            }).json(new apiResponse(200, "Doctor Logged in successfully 21:55", token));
        } catch (error) {
            res.status(401).json(new apiError(401,"Denide Authentication",error.message));
        }

    }
}



async function Logout(req, res) {
    res.status(200).clearCookie("token").json(new apiResponse(200,"Logged out"))
}


module.exports = { SignUp, Login, Logout };
