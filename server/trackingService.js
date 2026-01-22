import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TRACKINGMORE_API_KEY;
const API_BASE = "https://api.trackingmore.com/v4";

export async function getTrackingStatus(carrierCode, trackingNumber) {
  try {
    const response = await axios.get(
      `${API_BASE}/trackings/${carrierCode}/${trackingNumber}`,
      {
        headers: {
          "Tracking-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw new Error("Failed to fetch tracking info");
  }
}
