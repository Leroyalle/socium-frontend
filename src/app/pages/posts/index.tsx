import type { FC } from "react"
import { useGetAllPostsQuery } from "../../services/post-api"
import { Card, CreatePost } from "../../../features"

export const Posts: FC = () => {
  const { data } = useGetAllPostsQuery()
  return (
    <>
      <div className="mb-10 w-full">
        <div className="mb-10 w-full">
          <CreatePost />
        </div>
        {data &&
          data.length > 0 &&
          data.map(post => (
            <Card
              key={post.id}
              avatarUrl={post.author.avatarUrl ?? ""}
              content={post.content}
              name={post.author.name ?? ""}
              likesCount={post.likes.length}
              commentsCount={post.comments.length}
              authorId={post.authorId}
              id={post.id}
              likedByUser={post.isLiked}
              createdAt={post.createdAt}
              cardFor={"post"}
            />
          ))}
      </div>
    </>
  )
}
