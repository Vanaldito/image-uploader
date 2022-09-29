import { FetchCall } from "../models";

export function uploadImage(image: File): FetchCall {
  const data = new FormData();
  data.append("image", image);

  const controller = new AbortController();

  return {
    call: fetch("/upload", {
      method: "POST",
      body: data,
      signal: controller.signal,
    }),
    controller,
  };
}
