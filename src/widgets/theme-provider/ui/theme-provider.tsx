import type { FC, ReactNode } from "react"
import { createContext, useState } from "react"

type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

interface Props {
  children: ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider: FC<Props> = ({ children }) => {
  const selectedTheme = localStorage.getItem("theme")
  const currentTheme = selectedTheme
    ? (selectedTheme as "dark" | "light")
    : "dark"
  const [theme, setTheme] = useState(currentTheme)
  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "dark" ? "light" : "dark"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <main className={`${theme} text-background bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
