import type { FC } from "react"
import { useLazyGetPostByIdQuery } from "../../../app/services/post-api"
import { Controller, useForm } from "react-hook-form"
import { Button, Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import toast from "react-hot-toast"
import { hasErrorField } from "../../../app/utils"
import { useCreateCommentMutation } from "../../../app/services/comment-api"

interface Props {
  id: string
}

export const CreateComment: FC<Props> = ({ id }) => {
  const [createComment] = useCreateCommentMutation()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<{ comment: string }>()
  const errorMessage = errors?.root?.message

  const onSubmit = async (data: { comment: string }) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        await triggerGetPostById(id).unwrap()
        setValue("comment", "")
        toast.success("Комментарий добавлен")
      }
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(`${error.data.error}`)
      }
    }
  }

  return (
    <form className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="comment"
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите комментарий..."
            className="mb-5"
          />
        )}
      />
      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Прокомментировать
      </Button>
    </form>
  )
}
