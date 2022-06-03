import { useCallback } from 'react';
import { isFunction } from "../utils";
import { useSafeState } from "./use-safe-state";

export function useMergeState<T extends Record<string, unknown>>( defaultValue: T | (() => T)) {
  const [state, setState] = useSafeState(defaultValue);
  const update = useCallback((partValue: Partial<T> | ((value: T) => Partial<T> | T)) => {
    setState((oldValue) => {
      const newState = isFunction(partValue) ? partValue(oldValue) : partValue;
      return ({...oldValue, ...newState})
    });
  }, []);

  const updateWithKey = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState((oldValue) => ({...oldValue, [key]: value}));
  }, []);

  return [state, update, {updateWithKey}] as const;
}
