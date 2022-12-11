import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { Application } from 'express'
import { IdentityService } from './services/identity.service'

export default (app: Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  })

  container.register({
    // services
    identityService: asClass(IdentityService).scoped()
  })

  app.use(scopePerRequest(container))
}
