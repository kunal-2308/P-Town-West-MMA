import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const thankYouMailOptions = {
    from: `"P-Town West MMA" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to P-Town West MMA!",
    html: `
      <div style="background-color:#f0f4f8; padding:20px; font-family:Arial, sans-serif;">
       <img src="https://i.ibb.co/b5HLcsw/mainLogo.png" alt="P-Town West MMA" style="width:200px; height:auto; margin:0 auto; display:block;" />
        <h1 style="color:#000000;">Thank You, ${name}!</h1>
        <p style="color:#333; font-size:16px;">We are excited to welcome you to P-Town West MMA, Pune's premier Mixed Martial Arts academy! Here's a summary of the details you provided:</p>
        <ul style="background-color:#ffffff; padding:15px; border-radius:8px; list-style-type:none; color:#222;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p style="color:#333; font-size:16px;">At P-Town West MMA, we offer expert training in disciplines like Boxing, Brazilian Jiu-Jitsu (BJJ), Muay Thai, and Judo. Our inclusive environment is perfect for everyone, from beginners to experienced fighters. We can't wait to have you train with us!</p>
        <p style="color:#000000; font-weight:bold;">Best regards,</p>
        <p><strong>P-Town West MMA Team</strong></p>
      </div>
    `,
  };

  const notificationMailOptions = {
    from: `"P-Town West MMA" <${process.env.EMAIL_USER}>`,
    to: "notifications@example.com",
    subject: "New Membership Inquiry Received",
    html: `
      <div style="background-color:#f8f9fa; padding:20px; font-family:Arial, sans-serif;">
       <img src="https://i.ibb.co/b5HLcsw/mainLogo.png" alt="P-Town West MMA" style="width:200px; height:auto; margin:0 auto; display:block;" />
        <h2 style="color:#000000;">New Membership Inquiry</h2>
        <p style="color:#444; font-size:16px;">A new inquiry has been received with the following details:</p>
        <ul style="background-color:#ffffff; padding:15px; border-radius:8px; list-style-type:none; color:#555;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p style="color:#1976d2; font-weight:bold;">Please follow up with this individual to provide more information about our training programs.</p>
        <p><strong>P-Town West MMA Notification System</strong></p>
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
