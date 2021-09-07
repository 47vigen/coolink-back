export const throwError = (message) => (entityErr) => {
  throw new Error(message || entityErr)
}

export const notFound = (message) => (entity) => {
  if (entity) {
    return entity
  }
  if (message) throw new Error(message)
  return null
}

export const authorOrAdmin = (ctx, userField) => (entity) => {
  const user = ctx.auth?.user
  if (entity) {
    const isAdmin = user.role === 'ADMIN'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    throw new Error('Forbidden')
  }
  return null
}
