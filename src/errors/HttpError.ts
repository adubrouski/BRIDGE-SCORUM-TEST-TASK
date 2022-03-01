export default class HttpError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "HttpError";
  }
}
