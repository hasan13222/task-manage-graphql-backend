import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (email: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'Production',
    auth: {
      user: 'jamil8305@gmail.com',
      pass: config.smtp_password,
    },
  });

  await transporter.sendMail({
    from: 'jamil8305@gmail.com', 
    to: email, 
    subject: 'Password Change Email', 
    text: 'Password change text', 
    html: `<p>Please go to ${resetLink} to reset your forgotten password.</p>`, 
  });
};
