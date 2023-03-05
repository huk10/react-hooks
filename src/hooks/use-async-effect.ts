import {DependencyList, EffectCallback, useEffect} from 'react';
import {isPromise} from '../utils';

type AsyncEffectCallback = () => ReturnType<EffectCallback> | Promise<ReturnType<EffectCallback>>;
export function useAsyncEffect(effect: AsyncEffectCallback, deps: DependencyList = []) {
  useEffect(() => {
    const result = effect();
    if (isPromise(result)) {
      return () => {
        result.then(fn => typeof fn === 'function' && fn());
      };
    }
    return result;
  }, deps);
}
