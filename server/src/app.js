import express from 'express'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js";
import websiteRoutes from "./routes/website.routes.js";
import scanRoutes from "./routes/scan.routes.js";




const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        ststus: "API is Running",
        success: true,
    });
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/websites", websiteRoutes);
app.use("/api/v1/scans", scanRoutes);

export default app;