import {useRef, MutableRefObject} from 'react';

export function useRefObject<S>(object: S): MutableRefObject<S> {
  const ref = useRef<S>(object);
  ref.current = object;
  return ref;
}
