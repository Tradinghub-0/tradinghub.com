const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ribeks88@gmail.com', // Replace with your email
        pass: 'hearty.2006', // Replace with your email password or app password
    },
});

// Endpoint to handle messages
app.post('/send-message', (req, res) => {
    const { message } = req.body;

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'ribeks88@gmail.com', // Your email where messages are sent
        subject: 'New Message from Support Chat',
        text: `User Message: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send message' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Message sent successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
