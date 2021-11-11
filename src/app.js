'use strict'
import path from 'path'

import Fastify from 'fastify'
import cookie from 'fastify-cookie'
import mercurius from 'mercurius'
import mercuriusAuth from 'mercurius-auth'
import mercuriusUpload from 'mercurius-upload'
import CORS from 'fastify-cors'
import Static from 'fastify-static'
import appRoot from 'app-root-path'

// Configs
import User from './graphql/user/model'
import { ip, env, mongo, port, cookieSecret, instagram } from './config'

// Services
import mongoose from './services/mongoose'
import { IGConnect } from './services/instagram'
import { isAuth, refreshToken } from './services/jwt'

// Graphql
import { schema } from './graphql'

// server starter function
;(async () => {
  const app = Fastify()
  app.register(CORS, {
    origin: ['http://localhost:3000', 'https://coolink.ir', 'https://colk.ir'],
    credentials: true
  })

  app.register(cookie, {
    secret: cookieSecret
  })

  app.register(Static, {
    root: path.join(appRoot.toString(), 'uploads'),
    prefix: '/public/'
  })

  app.get('/refresh', refreshToken)

  app.register(mercuriusUpload)

  app.register(mercurius, {
    schema,
    graphiql: true,
    path: '/graphql'
  })

  await app.register(mercuriusAuth, {
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      const userRolesIdx = User.roles?.findIndex((role) => role === context.auth.identity)
      const userRoles = User.roles.filter((_, idx) => idx <= userRolesIdx)
      return userRoles.includes(authDirectiveAST.arguments[0].value?.value)
    },
    authDirective: 'auth'
  })

  app.graphql.addHook('preExecution', async (schema, document, context) => {
    const user = await isAuth(context)
    context.auth = {
      identity: user?.role || 'UNKNOWN',
      user
    }
  })

  if (mongo.uri) {
    mongoose.connect(mongo.uri)
  }
  mongoose.Promise = Promise

  if (instagram.enable) {
    await IGConnect()
  }

  setImmediate(() => {
    app.listen({ port, host: ip }).then(() => console.log('🚀 Server ready at http://%s:%d, in %s mode', ip, port, env))
  })
})()
