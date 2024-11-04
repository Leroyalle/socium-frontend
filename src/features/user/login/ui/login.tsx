import type { FC } from "react"
import { useForm } from "react-hook-form"
import type { TLogin } from "../types/login"

import { Button } from "@nextui-org/react"

import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../../../app/services/user-api"
import { hasErrorField } from "../../../../app/utils"
import { Input } from "../../../../entities"
import { SwitchAuthAction } from "../../../../shared"

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
      toast.success("Вы успешно вошли в аккаунт")
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(`${error.data.error}`)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name={"email"}
        label={"Email"}
        required="Обязательное поле"
        type="email"
        placeholder="example@yandex.ru"
      />
      <Input
        control={control}
        name={"password"}
        label={"Пароль"}
        required="Обязательное поле"
        type="password"
        placeholder="********"
      />
      <SwitchAuthAction
        setSelected={() => setSelected("register")}
        type="login"
      />
      <div className="flex gap-2 justify-end">
        <Button fullWidth color={"primary"} type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
