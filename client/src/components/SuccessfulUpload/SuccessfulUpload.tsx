import { SuccessfulIcon } from "../Icons";

import "./SuccessfulUpload.css";

interface SuccessfulUploadProps {
  image: File;
  imageId: string;
}

export default function SuccessfulUpload({
  image,
  imageId,
}: SuccessfulUploadProps) {
  const link = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }/uploads/${imageId}`;

  function clickHandler() {
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="successful-upload">
      <SuccessfulIcon />
      <h2 className="successful-upload__title">Uploaded Successfully!</h2>
      <img
        className="successful-upload__image"
        src={URL.createObjectURL(image)}
      />
      <div className="successful-upload__copy-link">
        <div className="successful-upload__link">{link}</div>
        <button
          type="button"
          onClick={clickHandler}
          className="successful-upload__copy-link-button"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
