import { useEffect, type FC } from "react"
import { useParams } from "react-router-dom"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../services/user-api"
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../../services/follow-api"
import { resetUser, selectCurrent } from "../../../features/user/slice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { CountInfo, GoBack, ProfileInfo } from "../../../shared"
import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { BASE_URL } from "../../../constans"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { formatToClientDate, hasErrorField } from "../../utils"
import toast from "react-hot-toast"

interface Props {
  className?: string
}

export const UserProfile: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams<{ id: string }>()
  const { data } = useGetUserByIdQuery(id ?? "")
  const currentUser = useAppSelector(selectCurrent)
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const [followUser] = useFollowUserMutation()
  const [unFollowUser] = useUnFollowUserMutation()

  useEffect(() => {
    return () => {
      dispatch(resetUser())
    }
  }, [])

  if (!data) {
    return null
  }

  // TODO: перенести в хук и декомпозировать страницу
  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unFollowUser(data.id)
          : await followUser({ followingId: data.id })
        await triggerGetUserByIdQuery(data.id)
        await triggerCurrentQuery()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error(`${error.data.error}`)
      }
    }
  }

  return (
    <>
      <GoBack />
      <div className="flex items-ceter gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 item-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />}>Редактировать</Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />
          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      {/* <EditProfile isOpen={isOpen} onClose={handleClose} user={data} /> */}
    </>
  )
}
