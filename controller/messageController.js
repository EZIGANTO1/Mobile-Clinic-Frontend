const Message = require('../module/messageModule');
const sendMail = require('../utils/sendMail')

// send message
const sendMessage = async (req, res, next) => {
    try {
        let { firstName, lastName, email, phoneNumber, message } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phoneNumber || !message) {
            return res.status(400).json({
                message: 'All required fields must be provided',
                success: false,
            });
        }

        // Create message in database
        await Message.create({ firstName, lastName, email, phoneNumber, message });

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully',
        });

    } catch (err) {
        // Handle duplicate key errors
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Duplicate ${Object.keys(err.keyValue)} entered`,
            });
        }

        // General error handler
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

const getAllMessages = async(req, res) =>{
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
}

// Reply to a message (send email)
const replyToMessage = async (req, res) => {
    const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required" });
  }

  try {
    await sendMail({
      to: email,
      subject: "Reply from Admin",
      text: message,
    });

    return res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    res.status(500).json({ 
        message: "Error sending reply", 
        error: error.message || error, 
    });
  }
};



module.exports = { 
    sendMessage,
    getAllMessages,
    replyToMessage 
};
