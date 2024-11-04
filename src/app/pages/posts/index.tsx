import type { FC } from "react"

interface Props {
  className?: string
}

export const Posts: FC<Props> = ({ className }) => {
  return <div className={className}>Posts</div>
}
