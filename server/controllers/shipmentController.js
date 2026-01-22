// import ShipEngine from "shipengine";
// import admin from "firebase-admin";

// // Initialize Firebase Admin only once
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }

// const db = admin.firestore();

// // ShipEngine client
// const shipengine = new ShipEngine(process.env.SHIPENGINE_API_KEY);

// export const createShipment = async (req, res) => {
//   try {
//     const { fullName, address, city, postalCode, phone, weight, mintAddress } =
//       req.body;

//     if (!fullName || !address || !city || !postalCode || !phone || !mintAddress)
//       return res.status(400).json({ error: "Missing fields" });

//     // 1️⃣ Create shipment using REAL ShipEngine request
//     const shipment = await shipengine.createShipment({
//       shipment: {
//         service_code: "usps_priority_mail", // or any service in your ShipEngine account
//         ship_to: {
//           name: fullName,
//           phone: phone,
//           address_line1: address,
//           city_locality: city,
//           postal_code: postalCode,
//           country_code: "US",        // IMPORTANT: must match your ShipEngine account
//         },
//         ship_from: {
//           name: "NFT Market Seller",
//           company_name: "NFThrive",
//           phone: "0000000000",
//           address_line1: "1 blockchain ave",
//           city_locality: "Austin",
//           postal_code: "73301",
//           country_code: "US",
//         },
//         packages: [
//           {
//             weight: {
//               value: weight || 100,
//               unit: "gram",
//             },
//           },
//         ],
//       },
//     });

//     // Check if ShipEngine failed at API layer
//     if (!shipment || !shipment.shipment_id) {
//       return res.status(500).json({
//         success: false,
//         error: "ShipEngine returned no shipment ID",
//         raw: shipment,
//       });
//     }

//     const trackingNumber = shipment.tracking_number || null;
//     const labelUrl =
//       shipment.label_download?.pdf || shipment.label_download?.href || null;

//     if (!trackingNumber || !labelUrl) {
//       return res.status(500).json({
//         success: false,
//         error: "ShipEngine did not generate a tracking number/label",
//         raw: shipment,
//       });
//     }

//     // 2️⃣ Store in Firestore
//     await db
//       .collection("deliveries")
//       .where("mintAddress", "==", mintAddress)
//       .limit(1)
//       .get()
//       .then((snap) => {
//         if (!snap.empty) {
//           snap.docs[0].ref.update({
//             trackingNumber,
//             labelUrl,
//             status: "shipped",
//           });
//         }
//       });

//     // 3️⃣ Send final result
//     res.json({
//       success: true,
//       trackingNumber,
//       labelUrl,
//     });
//   } catch (error) {
//     console.error("ShipEngine Error:", error);

//     return res.status(500).json({
//       success: false,
//       error: error.message || "ShipEngine API failed",
//       shipengine: error.errors || null,
//     });
//   }
// };

import { db } from "../utils/firebase.js";

export const createShipment = async (req, res) => {
  try {
    const { fullName, address, city, postalCode, phone, weight, mintAddress } =
      req.body;

    if (!mintAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing mintAddress",
      });
    }

    // Generate fake tracking number
    const trackingNumber =
      "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const shipmentData = {
      mintAddress,
      fullName,
      address,
      city,
      postalCode,
      phone,
      weight,
      trackingNumber,
      status: "delivering",
      timeline: ["Shipment Created"],
      createdAt: Date.now(),
    };

    // Save to Firestore — Admin SDK style ✔
    await db.collection("shipments").add(shipmentData);

    return res.json({
      success: true,
      trackingNumber,
      status: "delivering",
    });
  } catch (err) {
    console.error("Shipment Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
