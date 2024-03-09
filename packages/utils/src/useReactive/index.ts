import React, { useState, useRef, useEffect } from 'react';

type State = {
  [key: string]: any;
};

function useReactive<T extends State>(initialState: T): T {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const handler = {
    get(target: State, key: string): any {
      const value = Reflect.get(target, key);
      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, handler);
      }
      return value;
    },
    set(target: State, key: string, value: any): boolean {
      Reflect.set(target, key, value);
      setState({ ...stateRef.current });
      return true;
    },
  };

  const proxyState = new Proxy(state, handler);

  return proxyState as T;
}
export default useReactive;
