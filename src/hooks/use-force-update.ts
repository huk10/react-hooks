import {useReducer} from 'react';

// 强制触发组件更新
export function useForceUpdate() {
  return useReducer(c => (c += 1), 0)[1];
}
