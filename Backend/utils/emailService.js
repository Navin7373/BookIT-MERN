const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendAdminApprovalEmail = async (booking, user, hall) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: `New Hall Booking Request - ${hall.name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>User:</strong> ${user.name} (${user.email})</p>
        <p><strong>Hall:</strong> ${hall.name}</p>
        <p><strong>Location:</strong> ${hall.location}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.startTime} to ${booking.endTime}</p>
        <br/>
        <p>Please click one of the links below to accept or decline the booking:</p>
        <a href="${baseUrl}/api/bookings/accept/${booking._id}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">Accept Booking</a>
        <a href="${baseUrl}/api/bookings/decline/${booking._id}" style="padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px;">Decline Booking</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Admin approval email sent successfully");
  } catch (error) {
    console.error("Error sending admin approval email:", error);
  }
};

const sendUserStatusEmail = async (userEmail, userName, hallName, status, date, startTime, endTime) => {
  try {
    let subject, htmlMessage;

    if (status === "accepted") {
      subject = `Booking Accepted - ${hallName}`;
      htmlMessage = `
        <h2>Booking Accepted</h2>
        <p>Dear ${userName},</p>
        <p>Your booking for <strong>${hallName}</strong> on <strong>${date}</strong> from <strong>${startTime} to ${endTime}</strong> has been <strong>ACCEPTED</strong> by the admin.</p>
        <p>Thank you for choosing us!</p>
      `;
    } else {
      subject = `Booking Declined - ${hallName}`;
      htmlMessage = `
        <h2>Booking Declined</h2>
        <p>Dear ${userName},</p>
        <p>We're sorry, but your booking request for <strong>${hallName}</strong> on <strong>${date}</strong> from <strong>${startTime} to ${endTime}</strong> has been <strong>DECLINED</strong> by the admin.</p>
        <p>Please try booking a different date or time.</p>
      `;
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject,
      html: htmlMessage,
    };

    await transporter.sendMail(mailOptions);
    console.log(`User email (${status}) sent successfully`);
  } catch (error) {
    console.error("Error sending user status email:", error);
  }
};

module.exports = {
  sendAdminApprovalEmail,
  sendUserStatusEmail,
};
