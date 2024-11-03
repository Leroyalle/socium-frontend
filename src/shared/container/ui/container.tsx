import type { FC, ReactElement } from "react"

interface Props {
  children: ReactElement[] | ReactElement
}

export const Container: FC<Props> = ({ children }) => {
  return <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>
}
