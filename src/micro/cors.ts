import { config } from '../config'
import * as cors from 'cors'

export const corsConfig = cors({
  origin: config.corsAddress.indexOf('*') > -1 ? '*' : config.corsAddress.split(','),
  credentials: true
})
