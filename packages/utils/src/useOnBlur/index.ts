import React, { useEffect } from 'react';

type MultiRef = Record<string, React.MutableRefObject<any>>;
function useOnBlur(
  ref: React.MutableRefObject<any> | MultiRef,
  /** 点击内部事件，点击外部事件 */
  { outside, inside }: Record<'outside' | 'inside', (name?: any) => void>,
  /** 是否是单个区域点击 */
  type: 'multi' | 'single' = 'single',
) {
  useEffect(() => {
    function handler(event: Event) {
      if (type === 'multi') {
        Object.entries(ref?.current as MultiRef).forEach(([name, value]) => {
          (value?.current || value)?.contains(event.target) ? inside?.(name) : outside?.(name);
        });
      } else if (type === 'single') {
        ref?.current?.contains(event.target) ? inside?.() : outside?.();
      }
    }
    ref?.current && window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [inside, outside, ref]);
}

export default useOnBlur;
