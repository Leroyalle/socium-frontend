import { useContext, type FC } from "react"
import { ThemeContext } from "../../theme-provider/ui/theme-provider"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"

interface Props {
  className?: string
}

export const Header: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Navbar className={className}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Socium</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-xl cursor-pointer">
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem className="lg:flex text-xl cursor-pointer">
          Войти
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
