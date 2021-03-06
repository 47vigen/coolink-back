import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

// Main
import { types, inputs } from './common'
import { typeDefs as uploadTypeDefs, resolvers as uploadResolvers } from './upload'
import { typeDefs as authTypeDefs, resolvers as authResolvers } from './auth'
import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user'
import { typeDefs as pageTypeDefs, resolvers as pageResolvers } from './page'
import { typeDefs as sectionTypeDefs, resolvers as sectionResolvers } from './section'
import { typeDefs as statisticTypeDefs, resolvers as statisticResolvers } from './statistic'
import { typeDefs as shortLinkTypeDefs, resolvers as shortLinkResolvers } from './shortLink'
import { typeDefs as igTypeDefs, resolvers as igResolvers } from './instagram'
import { typeDefs as xmlTypeDefs, resolvers as xmlResolvers } from './xml'

// Other services
import { typeDefs as blogTypeDefs, resolvers as blogResolvers } from './blog'

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
  shortLinkTypeDefs,
  igTypeDefs,
  xmlTypeDefs,
  blogTypeDefs
])

// Merge resolvers from different sources
const resolvers = mergeResolvers([
  authResolvers,
  uploadResolvers,
  userResolvers,
  pageResolvers,
  sectionResolvers,
  statisticResolvers,
  shortLinkResolvers,
  igResolvers,
  xmlResolvers,
  blogResolvers
])

// Make schema
export default makeExecutableSchema({
  typeDefs,
  resolvers
})
