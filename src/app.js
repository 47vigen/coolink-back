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

import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { ip, env, mongo, port, cookieSecret, instagram } from './config'
import mongoose from './services/mongoose'
import { isAuth, refreshToken } from './services/jwt'
import { IGConnect } from './services/instagram'
import User from './graphql/user/model'

import { typeSchema, inputSchema } from './graphql/common'
import { schema as uploadSchema, resolvers as uploadResolvers } from './graphql/upload'
import { schema as authSchema, resolvers as authResolvers } from './graphql/auth'
import { schema as userSchema, resolvers as userResolvers } from './graphql/user'
import { schema as pageSchema, resolvers as pageResolvers } from './graphql/page'
import { schema as sectionSchema, resolvers as sectionResolvers } from './graphql/section'
import { schema as statisticSchema, resolvers as statisticResolvers } from './graphql/statistic'
import { schema as igSchema, resolvers as igResolvers } from './graphql/instagram'

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
    schema: makeExecutableSchema({
      // Merge type definitions from different sources
      typeDefs: mergeTypeDefs([typeSchema, uploadSchema, inputSchema, authSchema, userSchema, pageSchema, sectionSchema, statisticSchema, igSchema]),
      // Merge resolvers from different sources
      resolvers: mergeResolvers([authResolvers, uploadResolvers, userResolvers, pageResolvers, sectionResolvers, statisticResolvers, igResolvers])
    }),
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
