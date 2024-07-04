import { createContext } from "react"
//import { string } from "zod"

export type Theme = "dark" | "light" | "system"

export type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "dark",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export default ThemeProviderContext;