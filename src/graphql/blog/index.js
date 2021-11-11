import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { types, inputs } from './common'
import { typeDefs as postTypeDefs, resolvers as postResolvers } from './post'
import { typeDefs as commentTypeDefs, resolvers as commentResolvers } from './comment'

export const typeDefs = mergeTypeDefs([types, inputs, postTypeDefs, commentTypeDefs])
export const resolvers = mergeResolvers([postResolvers, commentResolvers])
