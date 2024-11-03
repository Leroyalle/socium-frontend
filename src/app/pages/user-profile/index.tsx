import type { FC } from "react"

interface Props {
  className?: string
}

export const UserProfile: FC<Props> = ({ className }) => {
  return <div className={className}></div>
}
