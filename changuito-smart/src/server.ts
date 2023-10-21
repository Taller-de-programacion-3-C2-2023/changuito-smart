import 'dotenv/config'
import { app } from './app'
import { appConfig } from './config'
import { terminate } from './helpers/serverExitHandler'

const main = async () => {
  try {
    const { port, host } = appConfig
    console.log('Server config')

    const server = app({
      logger: true,
      ignoreDuplicateSlashes: true,
    })

    server.listen({ port, host }, (err, address) => {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      console.log(`Listening on ${address}`)
      console.log(server.printRoutes())
    })

    const exitHandler = terminate(server, { coredump: false, timeout: 500 })
    process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
    process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
    process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
    process.on('SIGINT', exitHandler(0, 'SIGINT'))
  } catch (error: any) {
    console.error(error)
    process.exit(1)
  }
}

main()
