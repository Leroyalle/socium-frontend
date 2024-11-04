import type { FC } from "react"
import { useCurrentQuery } from "../../app/services/user-api"
import { Spinner } from "@nextui-org/react"

interface Props {
  children: JSX.Element
}

export const AuthGuard: FC<Props> = ({ children }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }

  return children
}
