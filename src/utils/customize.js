export const type = ['default', 'custom', 'gradient']
export const rounded = ['sm', 'md', 'lg', 'xl', 'full']
export const animate = [
  'ping',
  'pulse',
  'bounce',
  'flash',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat'
]
export const borderStyle = ['solid', 'dashed', 'dotted', 'double']
export const direction = ['t', 'l', 'b', 'r', 'tl', 'bl', 'tr', 'br']

export const customize = {
  type: {
    type: String,
    enum: type,
    default: 'default'
  },
  rounded: {
    type: String,
    enum: rounded
  },
  animate: {
    type: String,
    enum: animate
  },
  color: {
    type: String
  },
  background: {
    type: String
  },
  border: {
    type: String
  },
  borderStyle: {
    type: String,
    enum: borderStyle
  },
  direction: {
    type: String,
    enum: direction
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  via: {
    type: String
  }
}
