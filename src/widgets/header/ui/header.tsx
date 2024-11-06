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
import { Link, useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

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
        <Link to="/" className="flex gap-x-1 items-center">
          <img
            src={theme === "light" ? "/logo-light.jpg" : "/logo-dark.jpg"}
            alt="Logo"
            width={70}
            className="rounded-3xl"
          />
          <div className="">
            <p className="font-bold text-inherit">Socium</p>
            <p className="text-inherit italic">Share, create</p>
          </div>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer select-none"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              variant="flat"
              color="default"
              className="gap-2"
              onClick={() => handleLogout()}
            >
              <CiLogout />
              <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
