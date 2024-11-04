import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useState, type FC } from "react"
import { Login, Register } from "../../../features"

interface Props {
  className?: string
}

export const Auth: FC<Props> = ({ className }) => {
  const [selected, setSelected] = useState("login")

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key={"login"} title={"Вход"}>
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key={"register"} title={"Регистрация"}>
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
