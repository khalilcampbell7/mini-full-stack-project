import { useRef, useEffect } from 'react';

export function useFirstRender() {
  
  const firstRender = useRef(true);

  useEffect(() => {

    console.log('First Render Use Effect has gone off.')

    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export default useFirstRender;