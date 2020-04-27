import * as express from 'express'
import * as http from 'http'
import * as morgan from 'morgan'
import * as compression from 'compression'
import router from './routes'
import { config } from './config'
import { corsConfig } from './micro/cors'
import { convertError, normalizeError, sendErrorToClient } from './micro/globalErrorHandlers'


let app = express()
app.server = http.createServer(app)
app.use(corsConfig)
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api', router)

app.use([normalizeError, convertError, sendErrorToClient])
Promise.resolve().then(async () => {
  app.server.listen(config.port, () => {
    console.log(`Started on port ${config.port}`)
  })
})


