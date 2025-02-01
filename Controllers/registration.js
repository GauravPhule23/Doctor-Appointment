const Patient = require("../Models/patientSchema");
const Doctor = require("../Models/doctorSchema");

async function patientSignIN(req, res) {
    try {
        const { name, email, password, date, phone, gender } = req.body;

        if (!name || !email || !password || !date || !phone || !gender) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        const newPatient = await Patient.create({
            patientName: name,
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
}

async function doctorSignIN(req, res) {
    try {
        const { doctorName, email, password, dob, phone, gender, speciality, experienceOf, fees } = req.body;

        if (!doctorName || !email || !password || !speciality|| !date || !phone || !gender|| !experienceOf || !fees) {
            return res.status(400).json({ error: "Doctor name, email, password, and speciality are required" });
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

module.exports = { patientSignIN, doctorSignIN };
