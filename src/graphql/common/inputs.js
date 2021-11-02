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
    avatar: AvatarInput
    style: StyleInput
  }

  input AvatarInput {
    url: String
    position: PositionType
    customize: CustomizeInput
  }

  input StyleInput {
    customize: CustomizeInput
    background: BackgroundInput
    cover: CoverInput
  }

  input BackgroundInput {
    url: String
    color: String
  }

  input CoverInput {
    url: String
    customize: CustomizeInput
  }

  input SectionInput {
    page: ID!
    type: SectionType!
    position: Int!
    title: String
    items: [ItemInput!]!
    arrangement: String
    customized: Boolean
    customize: [CustomizeInput]
  }

  input SectionManyInput {
    id: ID!
    sectionInput: SectionInput!
  }

  input ItemInput {
    type: String
    key: String
    value: String
    options: [OptionInput!]
  }

  input OptionInput {
    key: String!
    value: String!
  }

  input CustomizeInput {
    type: CustomizeType
    rounded: String
    animate: String
    color: String
    second: String
    border: String
    borderStyle: String
    direction: String
    from: String
    to: String
    via: String
  }

  input StatisticInput {
    page: ID!
    ids: [ID!]
    event: String!
    agent: String
    refer: String
  }
`
