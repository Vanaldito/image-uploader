import { useEffect, useRef, useState } from "react";

import "./ImageUploader.css";

export default function ImageUploader() {
  const [image, setImage] = useState<DataTransferItem | File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("image", image as Blob);

      fetch("/upload", {
        method: "POST",
        body: data,
      });
    }
  }, [image]);

  function dropHandler<T>(event: React.DragEvent<T>) {
    event.preventDefault();

    if (event.dataTransfer.items.length === 0) return;

    if (event.dataTransfer.items[0].type.startsWith("image/")) {
      setImage(event.dataTransfer.items[0]);
    }
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;

    if (event.target.files[0].type.startsWith("image/")) {
      setImage(event.target.files[0]);
    }
  }

  function clickHandler() {
    fileInputRef.current?.click();
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
      <button
        className="image-uploader__choose-file-button"
        type="button"
        onClick={clickHandler}
      >
        Choose a file
      </button>
      <input ref={fileInputRef} type="file" hidden onChange={changeHandler} />
    </div>
  );
}
