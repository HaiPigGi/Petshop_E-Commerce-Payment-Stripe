import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (req, to, subject, text) => {
  try {
    // Configure transporter to send email using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_TEST,
        pass: process.env.EMAIL_TEST_APP_PWD,
      },
    });

    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_TEST,
      to: to,
      subject: subject,
      text: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error.message);
  }
};
<<<<<<< HEAD

=======
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce
