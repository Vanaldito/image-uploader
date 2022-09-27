import "./ImageUploader.css";

export default function ImageUploader() {
  return (
    <div className="image-uploader">
      <h2 className="image-uploader__title">Upload your image</h2>
      <div className="image-uploader__restrictions">
        File should be Jpeg, Png,...
      </div>
      <div className="image-uploader__drop">
        <img src="/image.svg" />
        <span>Drag & Drop your image here</span>
      </div>
      <div className="image-uploader__or">Or</div>
      <button className="image-uploader__choose-file-button">
        Choose a file
      </button>
      <input type="submit" hidden />
    </div>
  );
}
