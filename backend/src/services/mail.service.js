import transporter from "../config/nodemailer.js";

const sendMail = ({ to, subject, html }) => {
  const mailOptions = {
    to,
    subject,
    html,
  };

  const mailInfo = transporter.sendMail(mailOptions);
  console.log(mailInfo);
  return mailInfo;
};

export default sendMail;
