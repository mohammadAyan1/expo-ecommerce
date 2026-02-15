import mongoose from "mongoose"
import { ENV } from "./env.js"
export const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log(`Connection to MONGOOSE : ${conn.connection.host}`);
    } catch (error) {
        console.error("MONGOOSE connection error");
        process.exit(1)
    }
}