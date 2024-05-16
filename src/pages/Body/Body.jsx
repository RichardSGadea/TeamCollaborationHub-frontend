import { Route, Routes } from "react-router-dom"
import { Login } from "../Login/Login"
import { Home } from "../Home/Home"
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";

export const Body = () => {

    const user  = useSelector(getUserData);

    return (

        <>
            <Routes>

                <Route path="/" element={user.token==="" ? <Login /> : <Home />}></Route>
            </Routes>
        </>

    )

}