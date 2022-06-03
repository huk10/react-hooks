import {EffectCallback, useEffect} from 'react';


export function useFirstEffect(effectFn: EffectCallback) {
  useEffect(effectFn, []);
}
