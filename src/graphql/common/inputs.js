import { gql } from 'mercurius-codegen'

export const inputSchema = gql`
  input UserInput {
    name: String
    picture: String
    email: String!
    password: String!
  }

  input PageInput {
    pk: String!
    slug: String!
    title: String!
    subTitle: String
    profilePic: String
  }

  input SectionInput {
    page: ID!
    type: SectionType!
    position: Int!
    title: String
    links: [LinkInput!]
    text: String
    contacts: ContactsInput
    messengers: MessengersInput
    locations: [LocationInput!]
    faq: [FaqInput!]
  }

  input LinkInput {
    url: String!
    title: String!
  }

  input ContactsInput {
    mobile: String
    phone: String
    email: String
    fax: String
  }

  input MessengersInput {
    telegram: String
    whatsapp: String
    twitter: String
    youtube: String
    linkedin: String
  }

  input LocationInput {
    url: String!
    title: String!
  }

  input FaqInput {
    question: String!
    answer: String!
  }
`
