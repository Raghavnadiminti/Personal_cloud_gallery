
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { generateUploadUrl, generateReadUrl,Delete } = require("./upload.js");
const {listImages} = require('./images.js')
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/get-upload-url", async (req, res) => {
  const { filename, contentType } = req.body;

  if (!filename || !contentType)
    return res.status(400).json({ error: "Missing filename or contentType" });

  try {
    const url = await generateUploadUrl(filename, contentType);
    res.json({ uploadUrl: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

app.post("/get-read-url", async (req, res) => {
  const { key } = req.body;

  if (!key)
    return res.status(400).json({ error: "Missing key" });

  try {
    const url = await generateReadUrl(key);
    res.json({ readUrl: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate read URL" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await listImages();
    console.log("api",images)
    res.json(images);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Failed to load images" });
  }
});



app.delete("/delete-image", async (req, res) => {
  try {
    const { key } = req.body;

         Delete(key)


    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete" });
  }
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
