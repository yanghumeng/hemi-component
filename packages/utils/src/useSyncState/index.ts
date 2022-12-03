import { useEffect, useState, useRef } from 'react';
const useSyncState = (param: any) => {
  const dataRef: { current: any } = useRef();
  const [data, setData] = useState(param);

  useEffect(() => {
    dataRef.current?.(data);
  }, [data]);

  return [
    data,
    (payload: any, callback: any) => {
      dataRef.current = callback;
      setData(payload);
    },
  ];
};
export default useSyncState;
