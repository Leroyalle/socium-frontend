import { Button as NextButton } from "@nextui-org/react"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  endContent?: JSX.Element
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: React.FC<Props> = ({
  children,
  className,
  color,
  icon,
  fullWidth,
  endContent,
  type,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
      endContent={endContent}
    >
      {children}
    </NextButton>
  )
}
