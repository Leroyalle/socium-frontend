import { useContext, useState, type FC } from "react"
import { useUpdateUserMutation } from "../../../../app/services/user-api"
import {
  Controller,
  ErrorOption,
  Field,
  FieldArray,
  FieldArrayPath,
  FieldError,
  FieldErrors,
  FieldName,
  FieldRefs,
  FieldValues,
  FormState,
  InternalFieldName,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form"
import type { User } from "../../../../app/types"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { Input } from "../../../../entities"
import { MdOutlineEmail } from "react-icons/md"
import { ThemeContext } from "../../../../widgets/theme-provider/ui/theme-provider"

interface Props {
  id: string
  isOpen: boolean
  onClose: VoidFunction
  user?: User
}

export const EditProfile: FC<Props> = ({ id, isOpen, onClose, user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { theme } = useContext(ThemeContext)
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: "",
      bio: user?.bio,
      location: user?.location,
      dateOfBirth: user?.dateOfBirth,
    },
  })
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Изменение профиля</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Выберите файл"
                />
                <Input
                  name={"name"}
                  label={"Имя"}
                  control={control}
                  endContent={<MdOutlineEmail />}
                  placeholder="Имя"
                />
                <Input
                  name={"email"}
                  label={"Email"}
                  control={control}
                  endContent={<MdOutlineEmail />}
                  placeholder="example@yandex.ru"
                />
                <Input
                  name={"password"}
                  label={"Password"}
                  control={control}
                  endContent={<MdOutlineEmail />}
                  placeholder="Пароль"
                />
                <Controller
                  name={"bio"}
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} rows={4} placeholder="О себе" />
                  )}
                />
                <Input
                  name={"dateOfBirth"}
                  label={"День рождения"}
                  control={control}
                  endContent={<MdOutlineEmail />}
                  placeholder="День рождения"
                />
                <Input
                  name={"location"}
                  label={"Локация"}
                  control={control}
                  endContent={<MdOutlineEmail />}
                  placeholder="Страна, город"
                />

                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Сохранить
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
