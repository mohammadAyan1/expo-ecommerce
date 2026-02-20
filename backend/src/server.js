import express from "express";
import path from "path"
import { ENV } from "./config/env.js";
import { connectionDB } from "./config/db.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from "./config/innegest.js";

const app = express()

const __dirname = path.resolve()
app.use(express.json())
app.use(clerkMiddleware())

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "server is running" })
})

app.use("/api/inngest", serve({ client: inngest, functions }))

if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"))
    })
}

const startServer = async () => {
    await connectionDB();
    app.listen(ENV.PORT, () => {
        console.log("Server is Up And Running");
    })
}


startServer()