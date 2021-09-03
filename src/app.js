'use strict'

import Fastify from 'fastify'
import mercurius from 'mercurius'
import mercuriusAuth from 'mercurius-auth'

import { env, mongo, port } from './config'
import mongoose from './services/mongoose'

import { login, token } from './api/auth/resolvers'
import { create as createUser, showMe } from './api/user/resolvers'

const schema = `
  directive @auth(
    requires: Role = ADMIN,
  ) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    UNKNOWN
  }

  type Query {
    add(x: Int, y: Int): Int @auth(requires: USER)
    showMe : User @auth(requires: USER)
  }

  type Mutation {
      createUser(userInput : UserInput!) : WithToken
      login(userInput : UserInput!) : WithToken
  }

  type WithToken {
    token : String!
    user : User
  }

  input UserInput {
    name: String
    picture: String
    email: String!
    password: String!
  }

  type User {
      id: ID!
      name: String
      picture: String
      email: String!
  }
`

const resolvers = {
  Query: {
    add: async (_, obj) => {
      const { x, y } = obj
      return x + y
    },
    showMe
  },
  Mutation: {
    login,
    createUser
  }
}

async function startServer() {
  const app = Fastify()

  app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true
  })

  await app.register(mercuriusAuth, {
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      return authDirectiveAST.arguments[0].value.value === context.auth.identity
    },
    authDirective: 'auth'
  })

  app.graphql.addHook('preExecution', async (schema, document, context) => {
    const user = await token(context)
    context.auth = {
      identity: user?.role || 'UNKNOWN',
      user
    }
  })

  if (mongo.uri) {
    mongoose.connect(mongo.uri)
  }
  mongoose.Promise = Promise

  setImmediate(() => {
    app.listen(port).then(() => console.log('🚀 Server ready at http://localhost:%d/graphiql, in %s mode', port, env))
  })
}

startServer()
