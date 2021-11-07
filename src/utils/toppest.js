import { sort } from 'fast-sort'
import { isArray, isObject } from './is'

function toppest(array = [], dependeds = '', withOutOthers = false) {
  const data = {}

  array.map((item) => {
    const key = depends(item, dependeds)?.toString()?.toLowerCase()?.trim()
    if (key) Object.assign(data, { [key]: (data[key] || 0) + 1 })
    return true
  })

  if (!withOutOthers && (data.undefined || data.null)) Object.assign(data, { others: (data.undefined || 0) + (data.null || 0) })
  delete data.undefined
  delete data.null

  const parsedData = Object.keys(data).map((key) => ({ key, value: data[key] }))
  return sort(parsedData).desc((i) => i.value)
}

function depends(value, dependeds = []) {
  const depend = isArray(dependeds) ? [...dependeds] : dependeds.split('.')
  const first = Number(depend[0]) || depend[0]
  depend.shift()
  if (first && (isArray(value) || isObject(value))) {
    if (depend.length && value[first]) {
      return depends(value[first], depend)
    } else return value[first]
  } else return value
}

export default toppest
