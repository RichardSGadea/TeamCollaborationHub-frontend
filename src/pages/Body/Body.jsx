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

    // Retrieve user data from Redux store
    const user  = useSelector(getUserData);
    
    return (
        <>
            <Routes>
                {/* Redirect all undefined paths to the home route */}
                <Route path="*" element={<Navigate to="/"/>}/>

                {/* Define routes */}
                {/* Home route: renders Login if no token, otherwise renders Home */}
                <Route path="/" element={user.token==="" ? <Login /> : <Home />}></Route>

                {/* Profile route: renders Profile component */}
                <Route path="/profile" element={<Profile />}></Route>

                {/* Group routes: renders Group, Users, or Tasks components based on the URL */}
                <Route path="/group/:groupId" element={<Group />}></Route>
                <Route path="/group/:groupId/users" element={<Users />}></Route>
                <Route path="/group/:groupId/tasks" element={<Tasks />}></Route>

                {/* Admin route: renders Admin component */}
                <Route path="/admin/:infoId" element={<Admin />}></Route>
            </Routes>
        </>

    )

}