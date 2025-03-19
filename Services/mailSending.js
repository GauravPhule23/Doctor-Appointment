import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false for port 587 (STARTTLS)
  auth: {
    user: "quickcarehealthcare@gmail.com", // Your Gmail address
    pass: "ssva haoq jxrm jqws", // Your App Password
  },
  tls: {
    rejectUnauthorized: false, // Prevents SSL issues
  },
});

async function mailSender(toUser,SendSub,MessageInHTMLFormat,MessageInTextFormat){

  const info = await transporter.sendMail({
    from: '"QuickCare" quickcarehealthcare@gmail.com', // sender address
    to: toUser, // list of receivers
    subject: SendSub, // Subject line
    html: MessageInHTMLFormat,
    text: MessageInTextFormat,// html body
    encoding: "utf-8"
  });

}

module.exports = mailSender