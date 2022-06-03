import {MutableRefObject, useEffect, useRef} from 'react';

/**
 * 组件是否已卸载
 * @date 2021/8/20
 */
export function useUnmountedRef(): MutableRefObject<boolean> {
  const ref = useRef<boolean>(false);
  useEffect(() => {
    ref.current = false;
    return () => {
      ref.current = true;
    };
  }, []);
  return ref;
}
