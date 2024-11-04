import type { FC } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../../../entities"
import { useRegisterMutation } from "../../../../app/services/user-api"
import type { TRegister } from "../types/register"
import { SwitchAuthAction } from "../../../../shared"
import { Button } from "@nextui-org/react"
import { hasErrorField } from "../../../../app/utils"
import toast from "react-hot-toast"

interface Props {
  setSelected: (value: "login") => void
}

export const Register: FC<Props> = ({ setSelected }) => {
  const [register, { isLoading }] = useRegisterMutation()

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: TRegister) => {
    try {
      await register(data).unwrap()
      toast.success("Регистрация прошла успешно! Войдите в аккаунт")
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(`${error.data.error}`)
      }
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name={"name"}
        label={"Имя"}
        control={control}
        required="Это обязательное поле"
        placeholder="Имя..."
      />
      <Input
        name={"email"}
        label={"Email"}
        control={control}
        required="Это обязательное поле"
        placeholder="example@yandex.ru"
      />
      <Input
        name={"password"}
        label={"Пароль"}
        control={control}
        required="Это обязательное поле"
        placeholder="********"
      />
      <SwitchAuthAction
        setSelected={() => setSelected("login")}
        type="register"
      />
      <div className="flex gap-2 justify-end">
        <Button fullWidth color={"primary"} type="submit" isLoading={isLoading}>
          Зарегестрироваться
        </Button>
      </div>
    </form>
  )
}
