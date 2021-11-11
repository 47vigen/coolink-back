import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { types, inputs } from './common'
import { typeDefs as uploadTypeDefs, resolvers as uploadResolvers } from './upload'
import { typeDefs as authTypeDefs, resolvers as authResolvers } from './auth'
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user'
import { typeDefs as pageTypeDefs, resolvers as pageResolvers } from './page'
import { typeDefs as sectionTypeDefs, resolvers as sectionResolvers } from './section'
import { typeDefs as statisticTypeDefs, resolvers as statisticResolvers } from './statistic'
import { typeDefs as igTypeDefs, resolvers as igResolvers } from './instagram'

// Merge type definitions from different sources
const typeDefs = mergeTypeDefs([
  types,
  inputs,
  uploadTypeDefs,
  authTypeDefs,
  userTypeDefs,
  pageTypeDefs,
  sectionTypeDefs,
  statisticTypeDefs,
  igTypeDefs
])

// Merge resolvers from different sources
const resolvers = mergeResolvers([authResolvers, uploadResolvers, userResolvers, pageResolvers, sectionResolvers, statisticResolvers, igResolvers])

// Make schema
export default makeExecutableSchema({
  typeDefs,
  resolvers
})
