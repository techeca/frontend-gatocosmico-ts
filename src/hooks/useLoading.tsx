import { useEffect } from 'react';
 
//para FOUC
export default function useLoading(isLoading, setIsLoading) {
  useEffect(() => {
    if (isLoading === false) {
      setIsLoading(true);
    }
  }, [isLoading, setIsLoading]);
}
