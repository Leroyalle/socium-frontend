import type { FC } from "react"
import { useGetPostByIdQuery } from "../../services/post-api"
import { useParams } from "react-router-dom"
import { Card, CreateComment } from "../../../features"
import { GoBack } from "../../../shared"

export const CurrentPost: FC = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params.id ?? "")

  if (!data) {
    // TODO: navigate('/not-found)
    return <h1>Поста не существует</h1>
  }

  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={data.author.avatarUrl ?? ""}
        content={data.content}
        name={data.author.name ?? ""}
        likesCount={data.likes.length}
        commentsCount={data.comments.length}
        authorId={data.authorId}
        id={data.id}
        likedByUser={data.isLiked}
        createdAt={data.createdAt}
      />
      <div className="mt-10">
        <CreateComment id={params.id ?? ""} />
      </div>
      <div className="mt-10">
        {data.comments &&
          data.comments.map(comment => (
            <Card
              cardFor="comment"
              key={comment.id}
              avatarUrl={comment.user.avatarUrl ?? ""}
              content={comment.content}
              name={comment.user.name ?? ""}
              authorId={comment.userId}
              commentId={comment.id}
              id={data.id}
            />
          ))}
      </div>
    </>
  )
}
