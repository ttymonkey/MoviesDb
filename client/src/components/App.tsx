import { ReactNode, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import Alert from "./Alert"
import Header from "./layout/Header"
import Navigation from "./layout/Navigation"

export default function App(): ReactNode {
  // const { jwtToken } = useContext(AuthContext) as JwtContext
  const [jwtToken, setJwtToken] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertClassName, setAlertClassName] = useState("hidden")

  useEffect(() => {
    if (alertClassName === "fadeIn") {
      const timer = setTimeout(() => {
        setAlertClassName("fadeOut")
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [alertClassName])

  return (
    <div className="container mx-auto mt-8 max-w-screen-lg">
      <Alert message={alertMessage} alertClassName={alertClassName} />
      <Header jwtToken={jwtToken} setJwtToken={setJwtToken} />
      <div className="mt-4 flex flex-wrap">
        <Navigation jwtToken={jwtToken} />
        <div className="ml-4 mr-4 flex-grow">
          <Outlet context={{ jwtToken, setJwtToken, setAlertMessage, setAlertClassName }} />
        </div>
      </div>
    </div>
  )
}