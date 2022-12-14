import { useRef } from "react";
import { useFetchAndLoad } from "../../hooks";
import { uploadImage } from "../../services";
import { Loader } from "../Loader";
import { ImageInfo } from "../../models";

import "./ImageUploader.css";

interface ImageUploaderProps {
  setUploadedImage: (image: ImageInfo) => void;
}

export default function ImageUploader({
  setUploadedImage,
}: ImageUploaderProps) {
  const { loading, callEndpoint } = useFetchAndLoad();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function dropHandler<T>(event: React.DragEvent<T>) {
    event.preventDefault();

    if (event.dataTransfer.items.length === 0) return;
    if (!event.dataTransfer.items[0].type.startsWith("image/")) return;

    const image = event.dataTransfer.items[0].getAsFile();

    if (!image) return;

    callEndpoint(uploadImage(image))
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setUploadedImage({ image, imageId: data.imgId });
        }
      });
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;
    if (!event.target.files[0].type.startsWith("image/")) return;

    const image = event.target.files[0];

    callEndpoint(uploadImage(image))
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setUploadedImage({ image, imageId: data.imgId });
        }
      });
  }

  function clickHandler() {
    fileInputRef.current?.click();
  }

  return loading ? (
    <Loader />
  ) : (
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
