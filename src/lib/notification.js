// Simple notification system for contact form submissions
// This will log submissions to the console and can be extended for other notification methods

class NotificationService {
  constructor() {
    this.subscribers = [];
  }

  // Subscribe to form submissions
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  // Notify all subscribers when a form is submitted
  async notify(formData) {
    console.log('🔔 New contact form submission:', formData);
    
    // Notify all subscribers
    for (const callback of this.subscribers) {
      try {
        await callback(formData);
      } catch (error) {
        console.error('Error in notification callback:', error);
      }
    }
    
    return { success: true, message: 'Notification sent' };
  }

  // Simple console notification
  consoleNotification(formData) {
    console.log(`
=====================================
📧 NEW CONTACT FORM SUBMISSION
=====================================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}
-------------------------------------
Message:
${formData.message}
-------------------------------------
Submitted at: ${new Date().toISOString()}
=====================================
    `);
  }

  // File-based notification (saves to a log file)
  fileNotification(formData) {
    const fs = require('fs');
    const path = require('path');
    
    const logEntry = `
[${new Date().toISOString()}] New submission from ${formData.name} (${formData.email})
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}
Message: ${formData.message}
---
    `;
    
    const logPath = path.join(process.cwd(), 'contact-submissions.log');
    fs.appendFileSync(logPath, logEntry);
    console.log(`📝 Submission logged to ${logPath}`);
  }

  // Email notification using nodemailer
  async emailNotification(formData) {
    try {
      const nodemailer = require('nodemailer');
      
      // Check if email configuration exists
      const contactEmail = process.env.CONTACT_EMAIL;
      if (!contactEmail) {
        console.log('📧 Email notification skipped: CONTACT_EMAIL not configured');
        return;
      }

      // Create transporter object using SMTP transport
      // For Gmail, we'll use the app password method
      const transporter = nodemailer.createTransporter({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: contactEmail,
          pass: process.env.EMAIL_PASSWORD || '', // Will work with app passwords
        },
      });

      // Verify connection configuration
      await transporter.verify();
      
      // Define email options
      const mailOptions = {
        from: `"REDDOT Website" <${contactEmail}>`,
        to: contactEmail,
        subject: `New Contact Form Submission from ${formData.name}`,
        text: `
New contact form submission received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Message:
${formData.message}

Submitted at: ${new Date().toISOString()}
        `,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #8B4513;">New Contact Form Submission</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.service || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.budget || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.timeline || 'Not specified'}</td>
      </tr>
    </table>

    <div style="margin: 20px 0;">
      <h3 style="color: #8B4513; margin-bottom: 10px;">Message:</h3>
      <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #8B4513;">
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>

    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
      <p>Submitted at: ${new Date().toISOString()}</p>
      <p>This message was sent from the REDDOT.org.in website contact form.</p>
    </div>
  </div>
</body>
</html>
        `,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('📧 Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('📧 Error sending email notification:', error);
      // Don't throw error to prevent breaking the form submission
      return { success: false, error: error.message };
    }
  }
}

// Create a singleton instance
const notificationService = new NotificationService();

// Add default console notification
notificationService.subscribe(notificationService.consoleNotification.bind(notificationService));

// Add email notification if enabled
if (process.env.CONTACT_EMAIL) {
  notificationService.subscribe(notificationService.emailNotification.bind(notificationService));
}

// Export the service
module.exports = { notificationService };