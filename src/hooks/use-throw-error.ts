import {useCallback, useState} from 'react';

/**
 * 向 React 传播错误, 可以用错误边界捕获 使用 React.Suspense 设置回退效果
 * React.Suspense 配合错误边界可以定制错误显示样式
 * @date 2021/04/19
 */
export function useThrowError() {
  const [, setError] = useState(null);
  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}
