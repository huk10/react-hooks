import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useUnmountedRef } from "./use-unmounted-ref";
export function useSafeState<S>(initialState: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [state, setState] = useState(initialState);
  const unmountedRef = useUnmountedRef();
  return [
    state,
    useCallback((nextValue: S | ((oldValue: S) => S)) => {
      if (unmountedRef.current) {
        return
      }
      setState(nextValue)
    }, [])
  ]
}
