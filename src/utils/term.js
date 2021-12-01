export default function term(q = '') {
  // eslint-disable-next-line no-useless-escape
  return new RegExp(q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
}
