export function uploadImage(image: File) {
  const data = new FormData();
  data.append("image", image);

  return fetch("/upload", {
    method: "POST",
    body: data,
  });
}
