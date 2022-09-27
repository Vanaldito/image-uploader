import { useState } from "react";

import "./ImageUploader.css";

export default function ImageUploader() {
  const [image, setImage] = useState<DataTransferItem | null>(null);

  function dropHandler<T>(event: React.DragEvent<T>) {
    event.preventDefault();

    if (event.dataTransfer.items.length === 0) return;

    if (event.dataTransfer.items[0].type.startsWith("image/")) {
      setImage(event.dataTransfer.items[0]);
    }
  }

  return (
    <div className="image-uploader">
      <h2 className="image-uploader__title">Upload your image</h2>
      <div className="image-uploader__restrictions">
        File should be Jpeg, Png,...
      </div>
      <div
        className="image-uploader__drop"
        onDragOver={event => event.preventDefault()}
        onDrop={dropHandler}
      >
        <img src="/image.svg" />
        <span draggable>Drag & Drop your image here</span>
      </div>
      <div className="image-uploader__or">Or</div>
      <button className="image-uploader__choose-file-button">
        Choose a file
      </button>
      <input type="file" hidden />
    </div>
  );
}
