import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../Login/Login"
import { Home } from "../Home/Home"
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import { Profile } from "../Profile/Profile";
import { Group } from "../Group/Group";
import { Users } from "../Users/Users";
import { Tasks } from "../Tasks/Tasks";
import { Admin } from "../Admin/Admin";

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
                <Route path="/group/:groupId" element={<Group />}></Route>
                <Route path="/group/:groupId/users" element={<Users />}></Route>
                <Route path="/group/:groupId/tasks" element={<Tasks />}></Route>
                <Route path="/admin/:infoId" element={<Admin />}></Route>
            </Routes>
        </>

    )

}