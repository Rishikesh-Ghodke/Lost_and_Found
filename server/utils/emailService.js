const nodemailer = require('nodemailer');
const config = require('../config/config');

// Check if SMTP credentials are configured
const isEmailConfigured = config.SMTP_EMAIL && config.SMTP_PASSWORD;

if (!isEmailConfigured) {
  console.warn('⚠️  SMTP credentials not configured. Email notifications will not work.');
  console.warn('Please set SMTP_EMAIL and SMTP_PASSWORD in your .env file');
}

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.SMTP_EMAIL,
    pass: config.SMTP_PASSWORD
  }
});

const sendEmail = async (options) => {
  // Check if email is configured
  if (!isEmailConfigured) {
    throw new Error('Email service not configured. Please set SMTP credentials in .env file');
  }

  const message = {
    from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};

module.exports = sendEmail;