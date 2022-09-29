import { useState } from "react";
import {
  AppContainer,
  ImageUploader,
  SuccessfulUpload,
} from "../../components";
import { ImageInfo } from "../../models";

export default function Home() {
  const [uploadedImageInfo, setUploadedImageInfo] = useState<ImageInfo | null>(
    null
  );

  function uploadImage(imageInfo: ImageInfo) {
    setUploadedImageInfo(imageInfo);
  }

  return (
    <AppContainer>
      {uploadedImageInfo ? (
        <SuccessfulUpload
          image={uploadedImageInfo.image}
          imageId={uploadedImageInfo.imageId}
        />
      ) : (
        <ImageUploader setUploadedImage={uploadImage} />
      )}
    </AppContainer>
  );
}
