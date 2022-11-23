import { useEffect, useRef } from 'preact/compat';

export const usePrevious = (value): any => {
  const ref = useRef();
  useEffect((): void => {
    ref.current = value;
  });
  return ref.current;
};
