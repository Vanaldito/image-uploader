import express from "express";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";
import dotenv from "dotenv";
import mongoose from "mongoose";

import assetsRouter from "./src/routes/assets";

import { ImageInfo } from "./types";

const app = express();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV !== "production") {
  app.use(assetsRouter);
}

process.env.MONGODB_URI && mongoose.connect(process.env.MONGODB_URI);

const miniDB: { [id: string]: ImageInfo } = {};

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

app.get("/:imgId", (req, res) => {
  const { imgId } = req.params;

  if (!(imgId in miniDB))
    return res.status(404).json({ status: 404, error: "Image not found" });

  res.write(miniDB[imgId].data);
  res.end();
});

app.post("/upload", (req, res) => {
  const files = req.files;

  if (!files || !("image" in files)) {
    return res.status(400).json({ status: 400, error: "Image not uploaded" });
  }

  const image = files.image as UploadedFile;

  if (!image.mimetype.startsWith("image/")) {
    return res.status(400).json({ status: 400, error: "File is not an image" });
  }

  const imgId = `photo-${Date.now().toString(16)}`;
  miniDB[imgId] = {
    name: image.name,
    data: image.data,
  };

  res.status(200).json({ status: 200, imgId });
});

app.get("/*", (_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "static/index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
