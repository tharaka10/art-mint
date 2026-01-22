import axios from "axios";
import { db } from "../firebase.js";
import cron from "node-cron";

cron.schedule("0 * * * *", async () => {
  console.log("Checking delivery statuses...");

  const snaps = await db.collection("deliveries").get();

  for (const doc of snaps.docs) {
    const data = doc.data();

    if (!data.trackingNumber) continue;
    if (data.status === "delivered") continue;

    const res = await axios.get(
      `https://api.shipengine.com/v1/tracking?tracking_number=${data.trackingNumber}`,
      {
        headers: {
          "API-Key": process.env.SHIPENGINE_API_KEY,
        },
      }
    );

    const tracking = res.data;

    const latest = tracking.events?.[0]?.status_code || "";

    if (latest === "DL") {
      await db.collection("deliveries").doc(doc.id).update({
        status: "delivered",
        deliveredAt: Date.now(),
      });
    }
  }
});
