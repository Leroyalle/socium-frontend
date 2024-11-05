import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../../../app/services/post-api"
import { useDeleteCommentMutation } from "../../../../app/services/comment-api"
import { useNavigate } from "react-router-dom"
import { hasErrorField } from "../../../../app/utils"
import toast from "react-hot-toast"

export const useDeleteCard = (
  cardFor: "comment" | "post" | "current-post",
  id: string,
  commentId: string,
) => {
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const navigate = useNavigate()

  const onClickDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await triggerGetAllPosts().unwrap()
          toast.success("Пост удален")
          break
        case "comment":
          console.log(commentId)
          await deleteComment(commentId).unwrap()
          await triggerGetPostById(id).unwrap()
          toast.success("Комментарий удален")
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          toast.success("Пост удален")
          break

        default:
          throw new Error("Неверное значение cardFor")
      }
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error("Ошибка при удалении!")
      }
    }
  }
  return {
    onClickDelete,
    deleteCommentStatus,
    deletePostStatus,
  }
}
