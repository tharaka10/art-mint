import cron from "node-cron";
import { db } from "../utils/firebase.js";

const STATUS_FLOW = ["delivering", "shipped", "out_for_delivery", "delivered"];

cron.schedule("*/30 * * * * *", async () => {
  console.log("⏳ Running shipment cron...");

  try {
    const shipmentsSnap = await db.collection("shipments").get();

    for (const docSnap of shipmentsSnap.docs) {
      const data = docSnap.data();
      const currentIndex = STATUS_FLOW.indexOf(data.status);

      if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) continue;

      const nextStatus = STATUS_FLOW[currentIndex + 1];

      // Update shipment
      await db.collection("shipments").doc(docSnap.id).update({
        status: nextStatus,
        timeline: [...data.timeline, nextStatus],
      });

      // Update deliveries matching this NFT
      const delSnap = await db
        .collection("deliveries")
        .where("mintAddress", "==", data.mintAddress)
        .get();

      delSnap.forEach((d) => {
        db.collection("deliveries").doc(d.id).update({
          status: nextStatus,
          timeline: [...data.timeline, nextStatus],
        });
      });

      console.log(`🚚 Updated ${data.mintAddress} → ${nextStatus}`);
    }
  } catch (err) {
    console.error("Cron Error:", err);
  }
});
