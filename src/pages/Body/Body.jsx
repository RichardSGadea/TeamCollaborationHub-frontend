import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../Login/Login"
import { Home } from "../Home/Home"
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import { Profile } from "../Profile/Profile";
import { Group } from "../Group/Group";

export const Body = () => {

    const user  = useSelector(getUserData);

    return (

        <>
            <Routes>
                {/* Routes no exist */}
                <Route path="*" element={<Navigate to="/"/>}/>

                {/* Routes exist */}
                <Route path="/" element={user.token==="" ? <Login /> : <Home />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/group" element={<Group />}></Route>
            </Routes>
        </>

    )

}