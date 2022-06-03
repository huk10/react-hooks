export function isFunction ( target: unknown): target is Function  {
  return typeof target === "function"
}

export function isPromise <T = any>(val: unknown): val is Promise<T> {
  return typeof val === 'object' && isFunction(val['then']) && isFunction(val['catch'])
}
