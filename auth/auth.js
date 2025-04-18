const jwt = require('jsonwebtoken');
const User = require('../module/userModule'); 

// Middleware to authenticate dashboard users (Admin)
const isAdminAuthenticated = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    
    try {
        const token = req.cookies?.adminToken;  // Safe access to cookies
        if (!token) {
            return res.status(401).json({ message: "Admin is not authenticated!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user || req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access Denied! Only Admins are allowed." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token!", error: error.message });
    }
};

// Middleware to authenticate frontend users (Patients)
const isPatientAuthenticated = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    
    try {
        const token = req.cookies?.patientToken;
        if (!token) {
            return res.status(401).json({ message: "User is not authenticated!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user || req.user.role !== "Patient") {
            return res.status(403).json({ message: "Access Denied! Only Patients are allowed." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token!", error: error.message });
    }
};

// Middleware to authorize specific roles
const isAuthorized = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: `${req.user.role} is not allowed to access this resource!` });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: "Unauthorized access!", error: error.message });
        }
    };
};

module.exports = {
    isAdminAuthenticated,
    isPatientAuthenticated,
    isAuthorized
};
