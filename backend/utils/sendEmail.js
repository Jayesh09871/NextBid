import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // Gmail's SMTP server
    port: 465,     // Port 587 for unsecure TLS
    secure: true, // Set to false for TLS
    auth: {
      user: "your-email@gmail.com",  // Your Gmail email address
      pass: "your-app-specific-password",  // Your Gmail app-specific password
    },
  });

  const options = {
    from: "your-email@gmail.com", // Your Gmail email address
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(options);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};




// import nodeMailer from "nodemailer";

// export const sendEmail = async ({ email, subject, message }) => {
//   const transporter = nodeMailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     service: process.env.SMTP_SERVICE,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });
//   const options = {
//     from: process.env.SMTP_MAIL,
//     to: email,
//     subject: subject,
//     text: message,
//   };
//   await transporter.sendMail(options);
// };
