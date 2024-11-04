import type { FC } from "react"
import { selectCurrent } from "../../../features/user/slice"
import { useAppSelector } from "../../../app/hooks"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { BASE_URL } from "../../../constans"
import { Link } from "react-router-dom"
import { MdOutlineAlternateEmail } from "react-icons/md"

interface Props {
  className?: string
}

export const Profile: FC<Props> = ({ className }) => {
  const current = useAppSelector(selectCurrent)

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
    <Card className="p-y-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 p-x-4 flex-col items-center">
        <Image
          src={`${BASE_URL}${avatarUrl}`}
          alt={"Аватар " + name}
          className="object-cover rounded-xl"
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdOutlineAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
  )
}
