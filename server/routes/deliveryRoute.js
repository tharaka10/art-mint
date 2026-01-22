import express from "express";
import { db } from "../utils/firebase.js";
import { sendDeliveryEmails } from "../services/emailService.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      city,
      postalCode,
      phone,
      mintAddress,
      nftName,
    } = req.body;

    // 1. Save delivery request
    await db.collection("deliveries").add({
      buyer: email,
      mintAddress,
      fullName,
      address,
      city,
      postalCode,
      phone,
      status: "delivering",
      createdAt: Date.now(),
    });

    // 2. Get seller email from Firestore (nfts collection)
    const nftSnap = await db
      .collection("nfts")
      .where("mintAddress", "==", mintAddress)
      .limit(1)
      .get();

    let sellerEmail = null;
    if (!nftSnap.empty) {
      sellerEmail = nftSnap.docs[0].data().email || null;
    }

    // 3. Send emails
    await sendDeliveryEmails({
      buyerEmail: email,
      buyerName: fullName,
      sellerEmail,
      nftName,
      mintAddress,
      address,
      city,
      postalCode,
      phone,
    });

    res.json({ success: true });

  } catch (err) {
    console.error("Delivery error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
