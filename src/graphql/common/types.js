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
    id: ID!
    pk: String!
    slug: String!
    title: String!
    subTitle: String
    profilePic: String
    customize: Customize
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
    id: ID!
    page: Page
    user: User
    type: SectionType!
    position: Int!
    title: String
    items: [Item!]
    customize: [Customize!]
  }

  type Item {
    type: String
    key: String
    value: String
    option: [option!]
  }

  type option {
    key: String
    value: String
  }

  type Customize {
    type: CustomizeType
    rounded: RoundedType
    animate: AnimateType
    color: String
    background: String
    border: String
    borderStyle: BorderStyleType
    direction: DirectionType
    from: String
    to: String
    via: String
  }

  enum SlideType {
    video
    image
  }

  enum SectionType {
    links
    text
    contacts
    messengers
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
