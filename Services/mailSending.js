import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false for port 587 (STARTTLS)
  auth: {
    user: process.env.QUICK_CARE_EMAIL, // Your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD, // Your App Password
  },
  tls: {
    rejectUnauthorized: false, // Prevents SSL issues
  },
});

async function mailSender(toUser,SendSub,MessageInHTMLFormat,MessageInTextFormat){

  const info = await transporter.sendMail({
    from: `"QuickCare" ${process.env.QUICK_CARE_EMAIL}`, // sender address
    to: toUser, // list of receivers
    subject: SendSub, // Subject line
    html: MessageInHTMLFormat,
    text: MessageInTextFormat,// html body
    encoding: "utf-8"
  });

}

module.exports = mailSender