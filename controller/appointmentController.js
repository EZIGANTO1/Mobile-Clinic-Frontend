const User = require('../module/userModule');
const Appointment = require('../module/appointmentModule');

const postAppointment = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            nic,
            dob,
            gender,
            appointment_date,
            department,
            doctor_firstName,
            doctor_lastName,
            hasVisited = false, 
            address,
        } = req.body;

        // Validate required fields
        if (
            !firstName || 
            !lastName || 
            !email || 
            !phoneNumber || 
            !nic ||
            !dob || 
            !gender || 
            !appointment_date || 
            !department ||
            !doctor_firstName || 
            !doctor_lastName || 
            !address
        ) {
            return res.status(400).json({ message: "Please fill in the full form!" });
        }

        // Find doctor with exact name and department
        const doctor = await User.findOne({
            firstName: doctor_firstName,
            lastName: doctor_lastName,
            role: "Doctor",
            doctorDepartment: department,
        });

        if (!doctor) {
            return res.status(400).json({ message: "Doctor not found" });
        }

        // Check if the user is authenticated (assuming authentication middleware is used)
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized access. Please log in first." });
        }

        // Create the appointment
        const appointment = await Appointment.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            nic,
            dob,
            gender,
            appointment_date,
            department,
            doctor: {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
            },
            hasVisited,
            address,
            doctorId: doctor._id,
            patientId: req.user._id,
        });

        res.status(201).json({
            success: true,
            appointment,
            message: "Appointment successfully created!",
        });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404) .json({ message: "Appointment not found!"});
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
      });
    };

    const deleteAppointment = async (req, res) => {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
          return res.status(404).json({message: "Appointment Not Found!"});
        }
        await appointment.deleteOne();
        res.status(200).json({
          success: true,
          message: "Appointment Deleted!",
        });
      };
  

module.exports = {
    postAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
};
