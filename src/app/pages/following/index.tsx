import type { FC } from "react"

interface Props {
  className?: string
}

export const Following: FC<Props> = ({ className }) => {
  return <div className={className}>Following</div>
}
