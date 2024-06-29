import { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextState } from '@/contexts/UserContext';

export function useUserState() {
    const context = useContext<UserContextState | undefined>(UserContext);
  
    if (!context) {
      throw new Error('useUserState must be used within a UserContextProvider');
    }
  
    const { user } = context;
    const [isUser, setIsUser] = useState(!!user);

    useEffect(() => {
        setIsUser(!!user);
        console.log('useEffect useUserState');
    }, [user]);

    return isUser;
}