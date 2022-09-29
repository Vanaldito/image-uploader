import { SuccessfulIcon } from "../Icons";

import "./SuccessfulUpload.css";

interface SuccessfulUploadProps {
  image: File;
}

export default function SuccessfulUpload({ image }: SuccessfulUploadProps) {
  return (
    <div className="successful-upload">
      <SuccessfulIcon />
      <h2 className="successful-upload__title">Uploaded Successfully!</h2>
      <img
        className="successful-upload__image"
        src={URL.createObjectURL(image)}
      />
      <div className="successful-upload__copy-link">
        <div className="successful-upload__link">
          {window.location.protocol}
          {"//"}
          {window.location.hostname}
          {window.location.port && `:${window.location.port}`}
        </div>
        <button type="button" className="successful-upload__copy-link-button">
          Copy Link
        </button>
      </div>
    </div>
  );
}
