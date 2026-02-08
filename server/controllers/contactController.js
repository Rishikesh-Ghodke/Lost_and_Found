const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/emailService');
const config = require('../config/config');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create contact
  const contact = await Contact.create({
    name,
    email,
    subject,
    message
  });

  // Send email notification
  const emailSubject = subject || 'New Contact Form Submission';
  const emailMessage = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  try {
    // Send email notification to the configured SMTP email
    await sendEmail({
      email: config.SMTP_EMAIL, // Send to the actual email address
      subject: emailSubject,
      message: emailMessage
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message sent successfully'
    });
  } catch (err) {
    console.error('Email sending failed:', err);
    console.error('Error details:', err.message);

    // Still save the contact but inform about email failure
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message received but email notification failed'
    });
  }
});

module.exports = {
  createContact
};