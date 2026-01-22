import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,      // smtp.gmail.com etc.
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------------------------------------------------------
// SEND EMAIL TO BUYER + SELLER
// ----------------------------------------------------------
export const sendDeliveryEmails = async ({
  buyerEmail,
  buyerName,
  sellerEmail,
  nftName,
  mintAddress,
  address,
  city,
  postalCode,
  phone,
}) => {
  if (!buyerEmail || !sellerEmail) {
    console.log("❌ Missing buyer or seller email. Email not sent.");
    return;
  }

  // ------------------ BUYER EMAIL ------------------
  const buyerMail = {
    from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
    to: buyerEmail,
    subject: `Your Delivery Request is Confirmed - ${nftName}`,
    html: `
      <h2>Hello ${buyerName},</h2>
      <p>Your delivery request for <b>${nftName}</b> has been successfully placed.</p>

      <h3>Shipping Address:</h3>
      <p>
        ${address}<br/>
        ${city}, ${postalCode}<br/>
        Phone: ${phone}
      </p>

      <p>We will notify you once the package is shipped.</p>
      <br/>
      <p>Thank you for using our marketplace!</p>
    `,
  };

  // ------------------ SELLER EMAIL ------------------
  const sellerMail = {
    from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
    to: sellerEmail,
    subject: `A Buyer Requested Delivery for Your NFT (${nftName})`,
    html: `
      <h2>Hello Seller,</h2>
      <p>The buyer has confirmed delivery for your NFT <b>${nftName}</b>.</p>

      <h3>Buyer Shipping Details:</h3>
      <p>
        ${buyerName}<br/>
        ${address}<br/>
        ${city}, ${postalCode}<br/>
        Phone: ${phone}
      </p>

      <p>Please prepare the physical product for shipment.</p>
    `,
  };

  try {
    await transporter.sendMail(buyerMail);
    await transporter.sendMail(sellerMail);
    console.log("📩 Delivery emails sent to buyer & seller.");
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};
