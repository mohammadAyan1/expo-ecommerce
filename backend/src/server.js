import express from "express";
import path from "path"
import { ENV } from "./config/env.js";
import { connectionDB } from "./config/db.js";

import { clerkMiddleware } from '@clerk/express'

const app = express()

const __dirname = path.resolve()

app.use(clerkMiddleware())

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "server is running" })
})

if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"))
    })
}

app.listen(ENV?.PORT, () => {
    console.log("server is Up And running");
    connectionDB()
})