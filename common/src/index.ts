import * as errors from './errors'
import * as middlewares from './middlewares'

export * from './errors'
export * from './middlewares'

export default {
  ...errors,
  ...middlewares
}
