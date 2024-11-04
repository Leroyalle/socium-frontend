import { Link } from "@nextui-org/react"
import type { FC } from "react"

interface Props {
  setSelected: VoidFunction
  className?: string
}

export const SwitchAuthAction: FC<Props> = ({ setSelected, className }) => {
  return (
    <p className="text-center text-small">
      Нет аккаунта?{" "}
      <Link size="sm" className="cursor-pointer" onPress={setSelected}>
        Зарегестрируйтесь
      </Link>
    </p>
  )
}
