import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import "./Home.css"

export const Home = () => {

    const nameUser = useSelector(getUserData)
    
    return(
        <div className="container-fluid boxHome-design">
            <h1 className="title-welcome">{`Welcome ${nameUser.decoded.userFirstName}, this is your workspace!`}</h1>
        </div>

    )
}
