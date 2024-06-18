import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes'
import { ThemeProvider } from './components/theme-provider'
import { UserProvider } from './contexts/UserContext'
import { User } from './contexts/UserContext'

export type Theme = 'light' | 'dark' | 'system';


/*function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }*/
  
let theme = localStorage.getItem('vite-ui-theme');
const userData = sessionStorage.getItem('userData');
let user: User | null = null;

if (userData) {
  try {
    user = JSON.parse(userData) as User;
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
}

if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
    theme = 'system';
  }



//console.log(localStorage.getItem('vite-ui-theme'));

const router = createBrowserRouter(routes)

hydrateRoot(document.getElementById('root') as HTMLElement, 
    <React.StrictMode>
      <UserProvider initialSession={user}>
        <ThemeProvider theme={theme as Theme | undefined}>
            <RouterProvider router={router}/>
        </ThemeProvider>
      </UserProvider>
    </React.StrictMode>
    )