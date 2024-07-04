import { Moon, Sun } from "lucide-react"
import Button from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"

 
export function ModeToggle() {
  const { theme, setTheme } = useTheme()
 
  return (

    <Button onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")} variant="secondary" size="icon">
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> 
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"  />
    </Button>
  )
}