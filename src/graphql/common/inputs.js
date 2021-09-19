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
    items: [ItemInput!]!
    customize: [CustomizeInput]
  }

  input SectionManyInput {
    id: ID!
    sectionInput: SectionInput!
  }

  input ItemInput {
    type: String!
    key: String!
    value: String!
    option: [optionInput!]
  }

  input optionInput {
    key: String!
    value: String!
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
