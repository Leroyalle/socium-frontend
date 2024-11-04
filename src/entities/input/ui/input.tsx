import type { FC } from "react"
import { useController, type Control } from "react-hook-form"
import { Input as NextInput } from "@nextui-org/react"

interface Props {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
  className?: string
}

export const Input: FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required,
  endContent,
  className,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })
  return (
    <NextInput
      name={field.name}
      placeholder={placeholder}
      type={type}
      value={field.value}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
    />
  )
}
