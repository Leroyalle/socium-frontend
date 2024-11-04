import type React from "react"
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from "@nextui-org/react"
import { Link, useNavigate } from "react-router-dom"
import { RiDeleteBinLine } from "react-icons/ri"
import { FcDislike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../../app/services/like-api"
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../../app/services/post-api"
import { useAppSelector } from "../../../app/hooks"
import { selectCurrent } from "../../user/slice"
import { User } from "../../../entities"
import { formatToClientDate, hasErrorField } from "../../../app/utils"
import { MetaInfo, Typography } from "../../../shared"
import toast from "react-hot-toast"
import { useDeleteCard } from "../lib"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost, likePostStatus] = useLikePostMutation()
  const [unlikePost, unlikePostStatus] = useUnlikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrent)
  console.log(likedByUser)
  const onClickLikePost = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(`${error.data.error}`)
      }
    }
  }

  const { onClickDelete, deleteCommentStatus, deletePostStatus } =
    useDeleteCard(cardFor, id)
  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={onClickDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={onClickLikePost}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
        </CardFooter>
      )}
    </NextUiCard>
  )
}