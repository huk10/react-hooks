import {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {useUnmountedRef} from './use-unmounted-ref';
import {isFunction} from '../utils';

export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(isFunction(initialState) ? initialState() : initialState);
  const unmountedRef = useUnmountedRef();
  return [
    state,
    useCallback((nextValue: S | ((oldValue: S) => S)) => {
      if (unmountedRef.current) {
        return;
      }
      setState(nextValue);
    }, []),
  ];
}
