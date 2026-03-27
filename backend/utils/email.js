// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service failed:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

// ✅ Send welcome email (not verification)
const sendWelcomeEmail = async (email, userFullname) => {
  const mailOptions = {
    from: `"myHome" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to myHome! 🏠',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 14px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to myHome, ${userFullname}!</h1>
            </div>
            <div class="content">
              <p>Thank you for joining myHome! Your account has been successfully created.</p>
              <p>You can now:</p>
              <ul>
                <li>🔍 Browse available homes</li>
                <li>📅 Schedule viewings</li>
                <li>💬 Contact property owners</li>
                <li>⭐ Save your favorite listings</li>
              </ul>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/welcome" class="button">Get Started</a>
              </p>
              <p>If you have any questions, just reply to this email. We're here to help!</p>
            </div>
            <div class="footer">
              <p>© 2025 myHome. All rights reserved.</p>
              <p>This email was sent to ${email}. If you didn't create this account, please ignore it.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
  
  return await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };