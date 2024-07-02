import { useContext } from 'react';
import { UserContext, UserContextState, User } from '@/contexts/UserContext';

export function useUserState() {
    const context = useContext<UserContextState | undefined>(UserContext);
  
    if (!context) {
      throw new Error('useUserState must be used within a UserContextProvider');
    }
  
    const { user, setUser } = context;
    const rutas = user?.urls
    
    //const [isUser, setIsUser] = useState(!!user);
    /*useEffect(() => {
        setIsUser(!!user);
        console.log('useEffect useUserState');
    }, [user]);*/

    function updateUserProfile(updatedProfile: Partial<User>){
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          ...updatedProfile,
        };
      });
    }

    return {
      all: user,
      routes: rutas,
      user:{
        profile:{
          nombre:user?.nombre, 
          apellido:user?.apellido, 
          rut: user?.rut
        },
        account:{
          correo: user?.correo, 
          nombreFantasia: user?.clinica.nombreFantasia, 
          rol: user?.rol
        },
        update:{
          profile: updateUserProfile
        }
      },
    };
}