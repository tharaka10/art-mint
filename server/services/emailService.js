// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT) || 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ----------------------------------------------------------
// // SEND EMAIL TO BUYER + SELLER
// // ----------------------------------------------------------
// export const sendDeliveryEmails = async ({
//   buyerEmail,
//   buyerName,
//   sellerEmail,
//   nftName,
//   mintAddress,
//   address,
//   city,
//   postalCode,
//   phone,
// }) => {
//   if (!buyerEmail) {
//     console.log("❌ No buyer email — not sending emails");
//     return;
//   }
//   if (!sellerEmail) {
//     console.log("⚠ No seller email found — sending only buyer email");
//   }

//   // ------------------ BUYER EMAIL ------------------
//   const buyerMail = {
//     from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
//     to: buyerEmail,
//     subject: `Your Delivery Request is Confirmed - ${nftName}`,
//     html: `
//       <h2>Hello ${buyerName},</h2>
//       <p>Your delivery request for <b>${nftName}</b> has been successfully placed.</p>

//       <h3>Shipping Address:</h3>
//       <p>
//         ${address}<br/>
//         ${city}, ${postalCode}<br/>
//         Phone: ${phone}
//       </p>

//       <p>We will notify you once the package is shipped.</p>
//       <br/>
//       <p>Thank you for using our marketplace!</p>
//     `,
//   };

//   // ------------------ SELLER EMAIL ------------------
//   const sellerMail = {
//     from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
//     to: sellerEmail,
//     subject: `A Buyer Requested Delivery for Your NFT (${nftName})`,
//     html: `
//       <h2>Hello Seller,</h2>
//       <p>The buyer has confirmed delivery for your NFT <b>${nftName}</b>.</p>

//       <h3>Buyer Shipping Details:</h3>
//       <p>
//         ${buyerName}<br/>
//         ${address}<br/>
//         ${city}, ${postalCode}<br/>
//         Phone: ${phone}
//       </p>

//       <p>Please prepare the physical product for shipment.</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(buyerMail);

//     if (sellerEmail) {
//       await transporter.sendMail(sellerMail);
//     }

//     console.log("📩 Emails successfully sent.");

//   } catch (err) {
//     console.error("❌ Email sending failed:", err);
//   }
// };

// import nodemailer from "nodemailer";
// import admin from "firebase-admin";

// // ----------------------------------------------------------
// // FIREBASE ADMIN (make sure initialized elsewhere)
// // ----------------------------------------------------------
// const db = admin.firestore();

// // ----------------------------------------------------------
// // NODEMAILER CONFIG
// // ----------------------------------------------------------
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST, // e.g. smtp.gmail.com
//   port: Number(process.env.EMAIL_PORT) || 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // ----------------------------------------------------------
// // SEND DELIVERY EMAILS
// // ----------------------------------------------------------
// export const sendDeliveryEmails = async ({
//   buyerEmail,
//   buyerName,
//   sellerEmail,
//   mintAddress,
//   address,
//   city,
//   postalCode,
//   phone,
// }) => {
//   try {
//     // ------------------------------------------------------
//     // 1️⃣ GET NFT NAME FROM PURCHASES COLLECTION
//     // ------------------------------------------------------
//     const purchaseSnap = await db
//       .collection("purchases")
//       .where("mintAddress", "==", mintAddress)
//       .limit(1)
//       .get();

//     if (purchaseSnap.empty) {
//       console.log("❌ No purchase found for mintAddress:", mintAddress);
//       return;
//     }

//     const purchaseData = purchaseSnap.docs[0].data();
//     const nftName = purchaseData.name; // ✅ from Firestore

//     if (!nftName) {
//       console.log("❌ NFT name not found in purchase document");
//       return;
//     }

//     if (!buyerEmail || !sellerEmail) {
//       console.log("❌ Missing buyer or seller email");
//       return;
//     }

//     // ------------------------------------------------------
//     // 2️⃣ BUYER EMAIL
//     // ------------------------------------------------------
//     const buyerMail = {
//       from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
//       to: buyerEmail,
//       subject: `Your Delivery Request is Confirmed - ${nftName}`,
//       html: `
//         <h2>Hello ${buyerName},</h2>

//         <p>Your delivery request for <b>${nftName}</b> has been successfully placed.</p>

//         <h3>Shipping Address:</h3>
//         <p>
//           ${address}<br/>
//           ${city}, ${postalCode}<br/>
//           Phone: ${phone}
//         </p>

//         <p>We will notify you once the package is shipped.</p>
//         <br/>
//         <p>Thank you for using our marketplace!</p>
//       `,
//     };

//     // ------------------------------------------------------
//     // 3️⃣ SELLER EMAIL
//     // ------------------------------------------------------
//     const sellerMail = {
//       from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
//       to: sellerEmail,
//       subject: `Buyer Requested Delivery for NFT - ${nftName}`,
//       html: `
//         <h2>Hello Seller,</h2>

//         <p>The buyer has confirmed delivery for your NFT <b>${nftName}</b>.</p>

//         <h3>Buyer Shipping Details:</h3>
//         <p>
//           ${buyerName}<br/>
//           ${address}<br/>
//           ${city}, ${postalCode}<br/>
//           Phone: ${phone}
//         </p>

//         <p>Please prepare the physical product for shipment.</p>
//       `,
//     };

//     // ------------------------------------------------------
//     // 4️⃣ SEND EMAILS
//     // ------------------------------------------------------
//     await transporter.sendMail(buyerMail);
//     await transporter.sendMail(sellerMail);

//     console.log("📩 Delivery emails sent successfully");

//   } catch (err) {
//     console.error("❌ Email sending failed:", err);
//   }
// };

import nodemailer from "nodemailer";
import admin from "firebase-admin";

// ----------------------------------------------------------
// FIREBASE ADMIN (initialized elsewhere)
// ----------------------------------------------------------
const db = admin.firestore();

// ----------------------------------------------------------
// NODEMAILER CONFIG
// ----------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------------------------------------------------------
// SEND DELIVERY EMAILS
// ----------------------------------------------------------
export const sendDeliveryEmails = async ({
  buyerEmail,
  buyerName,
  sellerEmail,
  mintAddress,
  address,
  city,
  postalCode,
  phone,
}) => {
  try {
    // ------------------------------------------------------
    // 1️⃣ GET NFT DETAILS FROM `nfts` COLLECTION
    // ------------------------------------------------------
    const nftSnap = await db
      .collection("nfts")
      .where("mintAddress", "==", mintAddress)
      .limit(1)
      .get();

    if (nftSnap.empty) {
      console.log("❌ NFT not found for mintAddress:", mintAddress);
      return;
    }

    const nft = nftSnap.docs[0].data();

    const nftName = nft.name;
    const nftImage = nft.image;
    const manufactureDate = nft.manufactureDate;
    const expiryDate = nft.expiryDate;
    const certificateUrl = nft.certificateUrl;
    const quantity = nft.quantity;
    const weight = nft.weight;
    const mintAddressFromDB = nft.mintAddress;

    if (!buyerEmail || !sellerEmail) {
      console.log("❌ Missing buyer or seller email");
      return;
    }

    // ------------------------------------------------------
    // 2️⃣ BUYER EMAIL
    // ------------------------------------------------------
    const buyerMail = {
      from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
      to: buyerEmail,
      subject: `Your Delivery Request is Confirmed - ${nftName}`,
      html: `
        <h2>Hello ${buyerName},</h2>

        <p>Your delivery request for <b>${nftName}</b> has been successfully placed.</p>

        <h3>📦 Package Details</h3>
        <ul>
          <li><strong>Product:</strong> ${nftName}</li>
          <li><strong>Mint Address:</strong> ${mintAddressFromDB}</li>
          <li><strong>Manufactured Date:</strong> ${manufactureDate}</li>
          <li><strong>Expiry Date:</strong> ${expiryDate}</li>
          <li><strong>Weight per item:</strong> ${weight}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
        </ul>

        <p>
          <a href="${certificateUrl}" target="_blank">
            📄 View Certificate
          </a>
        </p>

        <img src="${nftImage}" alt="${nftName}" width="250" style="border-radius:10px"/>

        <h3>🚚 Shipping Address</h3>
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

    // ------------------------------------------------------
    // 3️⃣ SELLER EMAIL
    // ------------------------------------------------------
    const sellerMail = {
      from: `"NFT Marketplace" <${process.env.EMAIL_USER}>`,
      to: sellerEmail,
      subject: `Delivery Requested for NFT - ${nftName}`,
      html: `
        <h2>Hello Seller,</h2>

        <p>The buyer has confirmed delivery for your NFT <b>${nftName}</b>.</p>

        <h3>📦 Package Details</h3>
        <ul>
          <li><strong>Product:</strong> ${nftName}</li>
          <li><strong>Mint Address:</strong> ${mintAddressFromDB}</li>
          <li><strong>Manufactured Date:</strong> ${manufactureDate}</li>
          <li><strong>Expiry Date:</strong> ${expiryDate}</li>
          <li><strong>Weight per item:</strong> ${weight}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
        </ul>

        <img src="${nftImage}" alt="${nftName}" width="250" style="border-radius:10px"/>

        <h3>📍 Buyer Shipping Details</h3>
        <p>
          ${buyerName}<br/>
          ${address}<br/>
          ${city}, ${postalCode}<br/>
          Phone: ${phone}
        </p>

        <p>Please prepare the physical product for shipment.</p>
      `,
    };

    // ------------------------------------------------------
    // 4️⃣ SEND EMAILS
    // ------------------------------------------------------
    await transporter.sendMail(buyerMail);
    await transporter.sendMail(sellerMail);

    console.log("📩 Delivery emails with package details sent");

  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};
