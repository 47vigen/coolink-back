'use strict'

import Fastify from 'fastify'
import cookie from 'fastify-cookie'
import mercurius from 'mercurius'
import mercuriusAuth from 'mercurius-auth'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { ip, env, mongo, port, cookieSecret, instagram } from './config'
import mongoose from './services/mongoose'
import { isAuth, refreshToken } from './services/jwt'
import { connectIG } from './services/instagram'

import { typeSchema, inputSchema } from './graphql/common'
import { schema as authSchema, resolvers as authResolvers } from './graphql/auth'
import { schema as userSchema, resolvers as userResolvers } from './graphql/user'
import { schema as igSchema, resolvers as igResolvers } from './graphql/instagram'

// server starter function
;(async () => {
  const app = Fastify()

  app.register(cookie, {
    secret: cookieSecret
  })

  app.get('/refresh', refreshToken)

  app.register(mercurius, {
    schema: makeExecutableSchema({
      // Merge type definitions from different sources
      typeDefs: mergeTypeDefs([typeSchema, inputSchema, authSchema, userSchema, igSchema]),
      // Merge resolvers from different sources
      resolvers: mergeResolvers([authResolvers, userResolvers, igResolvers])
    }),
    graphiql: true
  })

  await app.register(mercuriusAuth, {
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      return authDirectiveAST.arguments[0].value.value === context.auth.identity
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
    await connectIG()
  }

  setImmediate(() => {
    app.listen({ port, host: ip }).then(() => console.log('🚀 Server ready at http://%s:%d, in %s mode', ip, port, env))
  })
})()
