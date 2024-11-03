import type { FC } from "react"
import { NavItem } from "./nav-item"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"

interface Props {
  className?: string
}

export const NavBar: FC<Props> = ({ className }) => {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-5">
        <li>
          <NavItem href={"/posts"} icon={<BsPostcard />}>
            Посты
          </NavItem>
          <NavItem href={"/Followers"} icon={<FiUsers />}>
            Подписчики
          </NavItem>
          <NavItem href={"/Following"} icon={<BsPostcard />}>
            Подписки
          </NavItem>
        </li>
      </ul>
    </nav>
  )
}
