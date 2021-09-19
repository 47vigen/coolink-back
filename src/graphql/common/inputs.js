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
    customize: CustomizeInput
  }

  input CustomizeInput {
    color: String
    backgroundImage: String
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

  input SectionManyInput {
    id: ID!
    sectionInput: SectionInput!
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

  input CustomizeInput {
    type: CustomizeType
    rounded: String
    animate: String
    color: String
    background: String
    border: String
    borderStyle: String
    direction: String
    from: String
    to: String
    via: String
  }
`
