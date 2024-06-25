import { useEffect } from 'react';
 
//para FOUC
export default function useLoading(isLoading: boolean, setIsLoading: (value: boolean) => void) {
  useEffect(() => {
    if (isLoading === false) {
      setIsLoading(true);
    }
  }, [isLoading, setIsLoading]);
}
