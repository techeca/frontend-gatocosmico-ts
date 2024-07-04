import { useEffect, useState } from "react"
import ThemeProviderContext, { Theme } from "@/contexts/ThemeContext"

type ThemeProviderProps = {
  children: React.ReactNode
  theme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  theme: initialState = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialState)

  useEffect(() => {
    const userTheme = (localStorage.getItem(storageKey) as Theme)

    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)

      // Add color scheme style
      root.style.setProperty('color-scheme', systemTheme);
      
      return
    }

    if(userTheme !== theme){
      setTheme(userTheme)
    }
    
    root.classList.add(userTheme)
    root.style.setProperty('color-scheme', userTheme);
    
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}


