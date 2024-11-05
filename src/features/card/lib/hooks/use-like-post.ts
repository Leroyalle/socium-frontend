import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../../../app/services/like-api"
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../../../app/services/post-api"
import { hasErrorField } from "../../../../app/utils"
import toast from "react-hot-toast"

export const useLikePost = (
  cardFor: "post" | "comment" | "current-post",
  id: string,
  likedByUser: boolean,
) => {
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const onClickLikePost = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()

      if (cardFor === "post") {
        await triggerGetAllPosts().unwrap()
      }
      if (cardFor === "current-post") {
        await triggerGetPostById(id).unwrap()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(`${error.data.error}`)
      }
    }
  }

  return {
    onClickLikePost,
  }
}
