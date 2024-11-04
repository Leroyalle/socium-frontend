import { useEffect, type FC } from "react"
import { Header, Profile } from "../../widgets"
import { Container } from "../../shared"
import { NavBar } from "../../widgets"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIsAuthenticated, selectUser } from "../../features/user/slice"
import { useAppSelector } from "../hooks"

export const Layout: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-1 p-4">{!user && <Profile />}</div>
      </Container>
    </>
  )
}
