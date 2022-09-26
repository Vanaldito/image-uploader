import { Router } from "express";

const assetsRouter = Router();

// You can add other image formats
const imageRegex = /\/.+\.(svg|png|jpg|jpeg|gif)$/;

assetsRouter.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/${filePath}`);
});

// You can add other video formats
const videoRegex = /\/.+\.(webm|avi|wmv|mov|mp4)$/;

assetsRouter.get(videoRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/${filePath}`);
});

// You can add other audio formats
const audioRegex = /\/.+\.(wav|mp3|ogg)$/;

assetsRouter.get(audioRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/${filePath}`);
});

export default assetsRouter;
