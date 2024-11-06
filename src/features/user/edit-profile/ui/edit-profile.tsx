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
import { hasErrorField } from "../../../../app/utils"
import toast from "react-hot-toast"

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

  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  const onSubmit = async (data: Partial<User>) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append("name", data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)
        selectedFile && formData.append("avatar", selectedFile)

        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          toast.error(`${error.data.error}`)
        }
      }
    }
  }

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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Выберите файл"
                  onChange={onChangeAvatar}
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
                  type="date"
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
