import axios from "axios";
import "dotenv/config";

export const shipengine = axios.create({
  baseURL: "https://api.shipengine.com/v1",
  headers: {
    "API-Key": process.env.SHIPENGINE_API_KEY,
    "Content-Type": "application/json",
  },
});
