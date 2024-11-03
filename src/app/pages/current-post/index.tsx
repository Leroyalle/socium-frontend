import type { FC } from "react"

interface Props {
  className?: string
}

export const CurrentPost: FC<Props> = ({ className }) => {
  return <div className={className}>CurrentPost</div>
}
