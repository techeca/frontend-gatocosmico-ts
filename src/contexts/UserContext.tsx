import { createContext, useState, ReactNode, useEffect } from 'react';
//import { getSession } from '../middlewares/utils.js';
//import useAlerts from '../hooks/useAlerts.jsx';

// Define a type for your user object
export interface User {
  correo: string,
  nombre: string,
  rut: string,
  apellido: string,
  tocken: string,
  rol: string,
  clinica: {
    nombreFantasia: string,
    razonSocial: string,
    rut: string
  },
  urls: { name: string; urls: { title: string; url: string; }[]; }[]
}
  
  // Define the shape of your context state
  export interface UserContextState {
    user?: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null |undefined>>;
  }
  
  // Create the context with the UserContextState type
  export const UserContext = createContext<UserContextState | undefined>(undefined);
  
  interface UserProviderProps {
    children: ReactNode;
    initialSession?: User | null | undefined;
  }

export const UserProvider = ({ children, initialSession }: UserProviderProps) => {
    const [user, setUser] = useState<User | null | undefined>(initialSession);
    
    //console.log(localStorage.getItem('vite-ui-theme'));
    useEffect(() => {
      sessionStorage.setItem('userData', JSON.stringify(user));
    }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};