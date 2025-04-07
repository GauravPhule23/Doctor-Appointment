



const approvedEmailFormat = (appointment) => {
  


   return {
    subject:`Doctor Appointment Confirmation  ${appointment.date} & [${appointment.startTime} to ${appointment.endTime}]`,
   bodyText:`Dear ${appointment.patient.fullName},

We are pleased to inform you that your appointment with Dr.${appointment.doctor.fullName} has been approved. Please find the details below:

Date: ${appointment.date}
Time: ${appointment.startTime} to ${appointment.endTime}

Best regards,
QuickCare
`,
bodyHtml : `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Appointment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>Dear ${appointment.patient.fullName},</p>

  <p>We are pleased to inform you that your appointment with <strong>Dr. ${appointment.doctor.fullName}</strong> has been approved. Please find the details below:</p>

  <p><strong>Date:</strong> ${appointment.date}<br>
  <strong>Time:</strong> ${appointment.startTime} to ${appointment.endTime}</p>

  <p>Best regards,<br>
  <strong>QuickCare</strong></p>
</body>
</html>
`,
to:appointment.patient.email,

   }
}


const completedEmailFormat = (appointment) => {
  return {
    subject: `Appointment Completed - ${appointment.date} [${appointment.startTime} to ${appointment.endTime}]`,
    bodyText: `Dear ${appointment.patient.fullName},

We hope you had a great experience with Dr. ${appointment.doctor.fullName}. Your appointment on ${appointment.date} from ${appointment.startTime} to ${appointment.endTime} has been successfully completed.

If you have any feedback or require further assistance, feel free to reach out.

Best regards,  
QuickCare`,
    bodyHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Appointment Completed</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>Dear ${appointment.patient.fullName},</p>

  <p>We hope you had a great experience with <strong>Dr. ${appointment.doctor.fullName}</strong>. Your appointment on <strong>${appointment.date}</strong> from <strong>${appointment.startTime} to ${appointment.endTime}</strong> has been successfully completed.</p>

  <p>If you have any feedback or require further assistance, feel free to reach out.</p>

  <p>Best regards,<br>
  <strong>QuickCare</strong></p>
</body>
</html>`,
    to: appointment.patient.email,
  };
};

const canceledEmailFormat = (info) => {
  return {
    subject: `Appointment Canceled - ${info.appointment.date} [${info.appointment.startTime} to ${info.appointment.endTime}]`,
    bodyText: `Dear ${info.appointment.patient.fullName},

We regret to inform you that your appointment with Dr. ${info.appointment.doctor.fullName} on ${info.appointment.date} from ${info.appointment.startTime} to ${info.appointment.endTime} has been canceled.

Reason for cancellation: ${info.reason}

If you would like to reschedule, please contact us at your earliest convenience.

Best regards,  
QuickCare`,
    bodyHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Appointment Canceled</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>Dear ${info.appointment.patient.fullName},</p>

  <p>We regret to inform you that your appointment with <strong>Dr. ${info.appointment.doctor.fullName}</strong> on <strong>${appointment.date}</strong> from <strong>${appointment.startTime} to ${appointment.endTime}</strong> has been canceled.</p>

  <p><strong>Reason for cancellation:</strong> ${info.reason}</p>

  <p>If you would like to reschedule, please contact us at your earliest convenience.</p>

  <p>Best regards,<br>
  <strong>QuickCare</strong></p>
</body>
</html>`,
    to: info.appointment.patient.email,
  };
};

module.exports = {
  approvedEmailFormat,completedEmailFormat,canceledEmailFormat
}


