import express from "express";
import path from "path";
import fileUpload, { UploadedFile } from "express-fileupload";

import assetsRouter from "./src/routes/assets";

import { ImageInfo } from "./types";

const app = express();

app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV !== "production") {
  app.use(assetsRouter);
}

const miniDB: { [id: string]: ImageInfo } = {};

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
  res.sendFile(path.join(__dirname, "static/index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
