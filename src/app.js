import cookieParser from "cookie-parser";
import express from "express";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";
import cors from "cors";
import appRouter from "./modules/auth/auth.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"))
});

app.use("/", appRouter);

export default app;
