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
    role: Role
  }

  type Page {
    id: ID!
    pk: String!
    slug: String!
    title: String!
    subTitle: String
    avatar: Avatar
    style: Style
    user: User
  }

  type Avatar {
    url: String
    position: PositionType
    customize: Customize
  }

  type Style {
    customize: Customize
    background: Background
    cover: Cover
  }

  type Background {
    url: String
    color: String
  }

  type Cover {
    url: String
    customize: Customize
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
    id: ID!
    page: Page
    user: User
    type: SectionType!
    position: Int!
    title: String
    items: [Item!]
    arrangement: String
    customized: Boolean!
    customize: [Customize!]
  }

  type Item {
    id: ID!
    type: String
    key: String
    value: String
    options: [option!]
  }

  type option {
    id: ID
    key: String
    value: String
  }

  type Customize {
    id: ID
    type: CustomizeType
    rounded: RoundedType
    animate: AnimateType
    color: String
    second: String
    border: String
    borderStyle: BorderStyleType
    direction: DirectionType
    from: String
    to: String
    via: String
  }

  type PageWithSections {
    page: Page
    sections: [Section!]
  }

  type Statistic {
    id: ID
    page: ID
    ids: [ID!]
    event: String
    agent: String
    refer: String
  }

  enum SlideType {
    video
    image
  }

  enum SectionType {
    links
    text
    contacts
    services
    locations
    faq
    igFeedsLink
    igFeedsDownload
  }

  enum UploadType {
    cover
    profile
    background
  }

  enum CustomizeType {
    default
    custom
    gradient
  }

  enum PositionType {
    side
    center
  }

  enum RoundedType {
    sm
    md
    lg
    xl
    full
  }

  enum AnimateType {
    ping
    pulse
    bounce
    flash
    rubberBand
    shakeX
    shakeY
    headShake
    swing
    tada
    wobble
    jello
    heartBeat
  }

  enum BorderStyleType {
    solid
    dashed
    dotted
    double
  }

  enum DirectionType {
    t
    l
    b
    r
    tl
    bl
    tr
    br
  }
`
