import { Link } from "@nextui-org/react"
import type { FC } from "react"

interface Props {
  setSelected: VoidFunction
  type: "login" | "register"
}

export const SwitchAuthAction: FC<Props> = ({ setSelected, type }) => {
  return (
    <p className="text-center text-small">
      {type === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
      <Link size="sm" className="cursor-pointer" onPress={setSelected}>
        {type === "login" ? "Зарегестрируйтесь" : "Войти"}
      </Link>
    </p>
  )
}
