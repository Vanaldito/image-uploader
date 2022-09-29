import { useState } from "react";
import { AppContainer, ImageUploader } from "../../components";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  function uploadImage(image: File) {
    setUploadedImage(image);
  }

  return uploadedImage ? (
    <img src={URL.createObjectURL(uploadedImage)} />
  ) : (
    <AppContainer>
      <ImageUploader setUploadedImage={uploadImage} />
    </AppContainer>
  );
}
