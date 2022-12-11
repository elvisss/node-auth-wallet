import { loadControllers } from 'awilix-express'
import express, { Application } from 'express'
import { config } from '../config'
import loadContainer from './container'

const app: Application = express()

loadContainer(app)

app.use(express.json())
app.use(loadControllers(`controllers/*.${config.dev ? 'ts' : 'js'}`, { cwd: __dirname }))

export { app }
