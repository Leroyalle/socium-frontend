import type { FC } from "react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../../app/services/post-api"
import { Controller, useForm } from "react-hook-form"
import { Textarea } from "@nextui-org/react"
import { Button } from "../../../shared"
import { IoMdCreate } from "react-icons/io"
import toast from "react-hot-toast"
import { hasErrorField } from "../../../app/utils"

interface Props {
  className?: string
}

export const CreatePost: FC<Props> = ({ className }) => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<{ post: string }>()
  const errorMessage = errors?.root?.message

  const onSubmit = async (data: { post: string }) => {
    try {
      await createPost({ content: data.post }).unwrap()
      await triggerAllPosts().unwrap()
      setValue("post", "")
      toast.success("Запись создана!")
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
        name="post"
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем думаете?"
            className="mb-5"
          />
        )}
      />
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  )
}
