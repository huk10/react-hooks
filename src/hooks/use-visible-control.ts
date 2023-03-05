import {useMemo, useState} from 'react';
import {useRefObject} from './use-ref-object';

type Control<T extends Record<string, boolean>> = {
  [P in keyof T]: {
    toggle: () => void;
    open: () => void;
    close: () => void;
    setValue: (newValue: boolean) => void;
  };
};
type SwitchControlType<T extends Record<string, boolean>> = Control<T> & {
  closeAll: () => void;
};

type HooksOption = {
  // 是否为互斥关系
  mutualExclusion?: boolean;
};

/**
 *
 * @param keys
 * @param options
 * @date 2022/5/6
 */
export function useVisibleControl<T extends Record<string, boolean>>(
  keys: T,
  options: HooksOption = {}
): [T, SwitchControlType<T>] {
  const [state, setState] = useState(keys);
  const option = useRefObject(options);
  return [
    state,
    useMemo(() => {
      const changeStatus = (oldValue: T, currKey: string, nextKeyValue) => {
        const otherKeys = Object.keys(oldValue).filter(val => val !== currKey);
        const newValue = {...oldValue, [currKey]: nextKeyValue} as Record<string, boolean>;
        // 如果互斥并且目标key的下一个值是true，就先关闭所有其他值
        // 是否延时设置值？
        if (option.current.mutualExclusion && nextKeyValue) {
          otherKeys.forEach(key => {
            newValue[key] = false;
          });
        }
        return newValue as T;
      };

      const result = {
        closeAll() {
          setState(
            oldValue =>
              Object.keys(oldValue).reduce((prev, curr) => {
                prev[curr] = false;
                return prev;
              }, {}) as T
          );
        },
      };

      for (const key of Object.keys(keys)) {
        result[key] = {
          toggle() {
            setState(oldValue => changeStatus(oldValue, key, !oldValue[key]));
          },
          open() {
            setState(oldValue => changeStatus(oldValue, key, true));
          },
          close() {
            setState(oldValue => ({...oldValue, [key]: false}));
          },
          setValue(newValue: boolean) {
            setState(oldValue => changeStatus(oldValue, key, newValue));
          },
        };
      }
      return result as SwitchControlType<T>;
    }, []),
  ];
}
