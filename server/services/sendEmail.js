import nodemailer from "nodemailer";

// Use environment variables for security
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,      // e.g., smtp.gmail.com
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,                     // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,    // your email
    pass: process.env.EMAIL_PASS,    // app password if using Gmail
  },
});

export const sendShipmentEmail = async (shipment) => {
  const {
    receiverEmail,
    receiverName,
    senderName,
    senderPhone,
    senderAddress1,
    senderAddress2,
    senderCity,
    senderState,
    senderZip,
    senderCountry,
    packageWeight,
    packageDimensions,
    packageDescription,
    courier,
    serviceType,
    trackingNumber,
  } = shipment;

  if (!receiverEmail) return; // skip if no email

  const mailOptions = {
    from: `"Shipping Portal" <${process.env.EMAIL_USER}>`,
    to: receiverEmail,
    subject: `Your Shipment is Created - Tracking #${trackingNumber}`,
    html: `
      <h3>Hello ${receiverName},</h3>
      <p>A new shipment has been created for you. Here are the details:</p>
      <h4>Sender Info:</h4>
      <p>Name: ${senderName}<br/>
         Phone: ${senderPhone}<br/>
         Address: ${senderAddress1}, ${senderAddress2 ? senderAddress2 + "," : ""} ${senderCity}, ${senderState}, ${senderZip}, ${senderCountry}</p>
      <h4>Package Info:</h4>
      <p>Description: ${packageDescription}<br/>
         Weight: ${packageWeight} kg<br/>
         Dimensions: ${packageDimensions}<br/>
         Courier: ${courier}<br/>
         Service Type: ${serviceType}<br/>
         Tracking Number: <b>${trackingNumber}</b></p>
      <p>Thank you for using our shipping portal!</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
};
