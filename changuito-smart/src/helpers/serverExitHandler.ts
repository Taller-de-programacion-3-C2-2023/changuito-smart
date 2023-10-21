export const terminate = (server: any, options = { coredump: false, timeout: 500 }) => {
  const exit = (code: number) => () => {
    options.coredump ? process.abort() : process.exit(code)
  }

  return (code: number, reason: string) => (error: Error, promise: Promise<any>) => {
    if (error && error instanceof Error) {
      console.log(error.message, error.stack)
    }
    server.close(exit(code))
    // If server hasn't finished in 500ms , shut down process
    setTimeout(exit(code), options.timeout).unref() // Prevents the timeout from registering on event loop
  }
}
