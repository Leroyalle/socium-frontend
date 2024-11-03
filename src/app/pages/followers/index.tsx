import type { FC } from "react"

interface Props {
  className?: string
}

export const Followers: FC<Props> = ({ className }) => {
  return <div className={className}>Followers</div>
}
