import express from "express";

const app = express()

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "server is running" })
})

app.listen(3000, () => {
    console.log("server is Up And running");
})