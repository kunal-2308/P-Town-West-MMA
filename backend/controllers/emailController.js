import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const thankYouMailOptions = {
    from: `"Example Company" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Reaching Out!",
    html: `
      <div style="background-color:#f0f4f8; padding:20px; font-family:Arial, sans-serif;">
        <h1 style="color:#0077b6;">Thank You, ${name}!</h1>
        <p style="color:#333; font-size:16px;">We appreciate your interest in Example Company! Below is a summary of the information you provided:</p>
        <ul style="background-color:#ffffff; padding:15px; border-radius:8px; list-style-type:none; color:#222;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p style="color:#333; font-size:16px;">Our team will review your message and reach out soon.</p>
        <p style="color:#0077b6; font-weight:bold;">Best regards,</p>
        <p><strong>Jane Doe</strong><br>Client Relations Manager<br>Example Company</p>
      </div>
    `,
  };

  const notificationMailOptions = {
    from: `"Example Company" <${process.env.EMAIL_USER}>`,
    to: "notifications@example.com",
    subject: "New Contact Submission Received",
    html: `
      <div style="background-color:#f8f9fa; padding:20px; font-family:Arial, sans-serif;">
        <h2 style="color:#ff6f61;">New Contact Alert</h2>
        <p style="color:#444; font-size:16px;">A new contact submission has been received with the following details:</p>
        <ul style="background-color:#ffffff; padding:15px; border-radius:8px; list-style-type:none; color:#555;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p style="color:#ff6f61; font-weight:bold;">Please review and follow up if necessary.</p>
        <p><strong>Notification System</strong><br>Example Company</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(thankYouMailOptions);
    await transporter.sendMail(notificationMailOptions);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res
      .status(500)
      .json({ message: "Failed to send emails", error: error.message });
  }
};
