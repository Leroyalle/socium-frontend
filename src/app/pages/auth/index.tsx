import type { FC } from "react"

interface Props {
  className?: string
}

export const Auth: FC<Props> = ({ className }) => {
  return <div className={className}>Auth</div>
}
