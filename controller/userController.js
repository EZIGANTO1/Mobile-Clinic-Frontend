const bcryptjs = require('bcryptjs');
const User = require('../module/userModule.js');
const cloudinary = require('cloudinary').v2;
const { generateToken } = require('../utils/jwtToken.js')


const patientRegister = async (req, res, next) => {
    try {
        let { firstName, lastName, email, password, phoneNumber, nic, dob, gender, role } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !phoneNumber || !nic || !dob || !gender || !role) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const saltRounds = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        // Save user in database
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            nic,
            dob,
            gender,
            role: 'Patient',
        });

        await newUser.save(); 
        generateToken(newUser, 'User Registered!', 200, res)

        // Register User in Database

        // const registeredUser = await newUser.save();
        
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        });

    } catch (err) {
        console.error('Registration Error:', err);

        // Handle duplicate key errors
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `User already exists with the given ${Object.keys(err.keyValue)}`,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: err.message,
        });
    }
};

// login user

const login = async (req, res) => {
        const { email, password, role } = req.body;

        if (!email || !password|| !role) {
            return res
            .status(400)
            .json({ message: 'email, password and role are required' });
        }

        //find the user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'email not found' });
        }

        console.log(user);

        //COMPARE PASSWORD
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        //find user by role
        if(role !== user.role){
            return res.status(404).json({ message: 'user with this Role not found' })
        }
        generateToken(user, 'Login Successfully', 201, res)

    }; 

const addNewAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, gender, dob, nic } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !phoneNumber || !nic || !dob || !gender) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Check if the admin is already registered
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        // Create and save the new admin user
        const admin = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            nic,
            dob,
            gender,
            role: 'Admin'
        });

        await admin.save();

        return res.status(201).json({
            success: true,
            message: 'New admin registered successfully',
            
            admin: {
                firstName,
                lastName,
                email,
                phoneNumber,
                nic,
                dob,
                gender,
                role: 'Admin'
            }
        });

    } catch (error) {
        console.error('Admin Registration Error:', error);
        res.status(500).json({ message: 'Error registering admin', error: error.message });
    }
};

// get all Doctors
const getAllDoctors = async (req, res) => {
    try {
        // Fetch only users with role 'Doctor'
        const doctors = await User.find({ role: 'Doctor' });

        if (doctors.length === 0) {
            return res.status(404).json({ message: 'No doctors found' });
        }
         return res.status(200).json({
            success: true,
            message: 'Doctors retrieved successfully',
            doctors,
        });

    } catch (error) {
        console.error('Error fetching doctors:', error);
        return res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
};

const getUserDetails = async(req, res) => {
    const user = req.user;
    return res.status (200).json({
        success: true,
        user
    });
}

const logoutAdmin = async(req, res) => {
    return res.status(200)
    .cookie('adminToken', '',{
        httpOnly: true,
        sameSite: "Lax",
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: 'Admin logged out successfully'
    })
}

const logoutPatient = async(req, res) => {
    return res.status(200)
    .cookie('patientToken', '',{
        httpOnly: true,
        sameSite: "Lax",
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: 'Patient logged out successfully'
    })
}

const addNewDoctor = async (req, res) => {
    try {
        // Check if files are uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Doctor Avatar is required" });
        }

        const { docAvatar } = req.files;

        // Validate allowed formats
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(docAvatar.mimetype)) {
            return res.status(400).json({ message: "File format not supported!" });
        }
        if (!docAvatar.tempFilePath) {
            return res.status(400).json({ message: "Temporary file path missing for avatar upload" });
        }

        // Validate required fields
        const { firstName, lastName, email, password, phoneNumber, gender, nic, dob, doctorDepartment } = req.body;
        if (!firstName || !lastName || !email || !password || !phoneNumber || !gender || !nic || !dob || !doctorDepartment) {
            return res.status(400).json({ message: "Please provide full details" });
        }

        // Check if the doctor is already registered by email
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return res.status(400).json({ message: `User with this email is already registered as ${isRegistered.role}` });
        }

        // Upload avatar to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            docAvatar.tempFilePath
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error(
              "Cloudinary Error:",
              cloudinaryResponse.error || "Unknown Cloudinary error"
            );
            return res.status(500).json({message: "Failed To Upload Doctor Avatar To Cloudinary"})
          }

    
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Save the doctor to the database
        const newDoctor = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            gender,
            nic,
            dob,
            doctorDepartment,
            role: "Doctor",
            docAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        // Respond with success message
        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor: newDoctor,
        });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ message: "Error adding doctor", error: error.message });
    }
};

module.exports = {
    patientRegister,
    login,
    addNewAdmin,
    getAllDoctors,
    getUserDetails,
    logoutAdmin,
    logoutPatient,
    addNewDoctor,
};
