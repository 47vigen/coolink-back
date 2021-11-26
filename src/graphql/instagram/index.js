import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { typeDefs as mainTypeDefs, resolvers as mainResolvers } from './main'
import { typeDefs as feedTypeDefs, resolvers as feedResolvers } from './feed'

export const typeDefs = mergeTypeDefs([mainTypeDefs, feedTypeDefs])
export const resolvers = mergeResolvers([mainResolvers, feedResolvers])
