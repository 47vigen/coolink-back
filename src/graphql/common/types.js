import { gql } from 'mercurius-codegen'

export const typeSchema = gql`
  type WithToken {
    token: String!
    user: User
  }

  type User {
    id: ID!
    name: String
    picture: String
    email: String!
  }

  type Page {
    pk: String!
    slug: String!
    title: String!
    subTitle: String
    profilePic: String
    user: User
  }

  type PageInfo {
    pk: ID!
    fullName: String!
    profilePic: String
    isPrivate: Boolean!
  }

  type PageFeeds {
    feeds: [Feed]!
    next: String
  }

  type FollowRequest {
    following: Boolean!
    outgoingRequest: Boolean!
  }

  type Feed {
    id: ID!
    pk: ID!
    createdAt: String!
    caption: String
    slides: [Slide]!
  }

  type Slide {
    type: SlideType!
    imageUrl: String!
    videoUrl: String
  }

  enum SlideType {
    VIDEO
    IMAGE
  }
`
