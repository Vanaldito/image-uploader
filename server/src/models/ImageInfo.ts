import { Document, model, Schema } from "mongoose";

interface ImageDocument extends Document {
  image: Buffer;
}

const imageSchema = new Schema({
  image: Buffer,
});

export const Image = model<ImageDocument>("ImageInfo", imageSchema);
