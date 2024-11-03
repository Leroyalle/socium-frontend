import type { FC, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../../shared"

interface Props {
  children: ReactNode
  icon: JSX.Element
  href: string
}

export const NavItem: FC<Props> = ({ icon, href, children }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
