import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Coder Ecommerce" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    })

    console.log('Email enviado: ' + info.messageId);
    return info;
    
  } catch (error) {
    console.log('Error enviando el email: ' + error.message);
    throw error;
  }
}

export default sendEmail;