import { POST, route } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { IdentityService } from '../services/identity.service'

@route('/identity')
export class IdentityController extends BaseController {
  constructor(private readonly identityService: IdentityService) {
    super()
  }

  @route('/authenticate')
  @POST()
  async index(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const token = await this.identityService.authenticate(email, password)
      res.send(token)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/create')
  @POST()
  public async create(req: Request, res: Response): Promise<void> {
    try {
      await this.identityService.create({
        email: req.body.email,
        password: req.body.password,
      })
      res.status(201).send()
    } catch (error) {
      this.handleException(error, res)
    }
  }
}
