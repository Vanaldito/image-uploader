export interface FetchCall {
  call: Promise<Response>;
  controller?: AbortController;
}
