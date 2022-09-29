import { useState } from "react";
import {
  AppContainer,
  ImageUploader,
  SuccessfulUpload,
} from "../../components";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  function uploadImage(image: File) {
    setUploadedImage(image);
  }

  return (
    <AppContainer>
      {uploadedImage ? (
        <SuccessfulUpload image={uploadedImage} />
      ) : (
        <ImageUploader setUploadedImage={uploadImage} />
      )}
    </AppContainer>
  );
}
