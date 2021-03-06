import { gql } from 'mercurius-codegen'

export const types = gql`
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
    createdAt: String!
    updatedAt: String!
  }

  type Template {
    id: ID!
    slug: String!
    title: String!
    subTitle: String
    avatar: Avatar
    style: Style
    createdAt: String!
    updatedAt: String!
  }

  type Avatar {
    url: String
    position: PositionType
    customize: Customize
  }

  type Style {
    customize: Customize
    display: Display
    titles: Titles
    background: Background
    cover: Cover
  }

  type Display {
    font: FontType
    direction: DirectionType
  }

  type Titles {
    color: String
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
    id: ID
    pk: String!
    title: String
    caption: String
    slides: [Slide]!
    createdAt: String!
    updatedAt: String!
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
    createdAt: String!
    updatedAt: String!
  }

  type Item {
    id: ID!
    type: String
    key: String
    value: String
    options: [Option!]
  }

  type Option {
    id: ID!
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

  type PageWithFeedsSection {
    page: Page
    feeds: [Feed!]
    section: Section
  }

  type FeedWithPageSection {
    page: Page
    feed: Feed
    section: Section
  }

  type Statistic {
    id: ID!
    page: ID!
    ids: [ID!]
    event: String!
    agent: String
    referrer: String
    pathname: String
    ip: String
    createdAt: String!
    updatedAt: String!
  }

  type ShortLink {
    id: ID!
    slug: String!
    isDeep: Boolean!
    destination: String!
    page: Page
    createdAt: String!
    updatedAt: String!
  }

  type Xml {
    loc: String!
    priority: Float!
    lastmod: String!
    changefreq: String!
  }

  enum FontType {
    dana
    peyda
    iransans
  }

  enum DirectionType {
    rtl
    ltr
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
    feeds
  }

  enum UploadType {
    cover
    profile
    background
    post
    content
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

  enum DaysType {
    for7
    for30
  }
`
