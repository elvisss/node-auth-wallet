import { GET, route } from 'awilix-express'
import { Request, Response } from 'express'
import { config } from '../../config'

@route('/check')
export class CheckController {
  @GET()
  public index(_req: Request, res: Response): void {
    res.send({
      NODE_ENV: config.nodeEnv,
      APP_ENV: config.appEnv,
    })
  }
}
