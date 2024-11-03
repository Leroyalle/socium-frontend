import type { FC } from "react"
import { Header } from "../../widgets/header"
import { Container } from "../../shared"
import { NavBar } from "../../widgets"
import { Outlet } from "react-router-dom"

interface Props {
  className?: string
}

export const Layout: FC<Props> = ({ className }) => {
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
      </Container>
    </>
  )
}
