export default interface Logger {
  debug(message: string): void,
  info(message: string): void,
  http(message: string): void,
  error(message: string | Error): void,
}