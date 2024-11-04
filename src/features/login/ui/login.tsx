import type { FC } from "react"
import { useForm } from "react-hook-form"
import type { TLogin } from "../types/login"
import { Input } from "../../../entities"
import { Button, Link } from "@nextui-org/react"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../../app/services/user-api"
import { useNavigate } from "react-router-dom"
import { SwitchAuthAction } from "../../../shared"

interface Props {
  setSelected: (value: "register") => void
}

export const Login: FC<Props> = ({ setSelected }) => {
  const [login, { isLoading, isError }] = useLoginMutation()
  const navigate = useNavigate()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: TLogin) => {
    try {
      await login(data).unwrap()
    } catch (error) {}
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name={"email"}
        label={"Email"}
        required="Обязательное поле"
        type="email"
      />
      <Input
        control={control}
        name={"password"}
        label={"Пароль"}
        required="Обязательное поле"
        type="password"
      />
      <SwitchAuthAction setSelected={() => setSelected("register")} />
      <div className="flex gap-2 justify-end">
        <Button fullWidth color={"primary"} type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
