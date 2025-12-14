// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateUploadUrl,generateReadUrl } from "./upload.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/get-upload-url", async (req, res) => {
  const { filename, contentType } = req.body;

  if (!filename || !contentType)
    return res.status(400).json({ error: "Missing filename or contentType" });

  const url = await generateUploadUrl(filename, contentType);
  res.json({ uploadUrl: url });
});

app.post("/get-read-url", async (req, res) => {
  const { key } = req.body;

  if (!key)
    return res.status(400).json({ error: "Missing key" });

  const url = await generateReadUrl(key);
  res.json({ readUrl: url });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
