import { useContext, type FC } from "react"
import { ThemeContext } from "../../theme-provider/ui/theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { logout, selectIsAuthenticated } from "../../../features/user/slice"
import { useNavigate } from "react-router-dom"

interface Props {
  className?: string
}

export const Header: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar className={className}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Socium</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-xl cursor-pointer select-none"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem className="lg:flex text-xl cursor-pointer">
          {isAuthenticated && (
            <Button
              variant="flat"
              color="default"
              className="gap-2"
              onClick={() => handleLogout()}
            >
              Выйти
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
