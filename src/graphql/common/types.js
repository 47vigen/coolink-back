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
    createdAt: String!
    caption: String
    slides: [Slide]!
  }

  type Slide {
    type: SlideType!
    imageUrl: String!
    videoUrl: String
  }

  type Section {
    page: Page
    user: User
    type: SectionType!
    position: Int!
    title: String
    links: [Link!]
    text: String
    contacts: Contacts
    messengers: Messengers
    locations: [Location!]
    faq: [Faq!]
  }

  type Link {
    url: String!
    title: String!
  }

  type Contacts {
    mobile: String
    phone: String
    email: String
    fax: String
  }

  type Messengers {
    telegram: String
    whatsapp: String
    twitter: String
    youtube: String
    linkedin: String
  }

  type Location {
    url: String!
    title: String!
  }

  type Faq {
    question: String!
    answer: String!
  }

  enum SlideType {
    VIDEO
    IMAGE
  }

  enum SectionType {
    LINKS
    TEXT
    CONTACTS
    MESSANGERS
    LOCATIONS
    FAQ
    IG_FEEDS_LINK
    IG_FEEDS_DOWNLOAD
  }
`
