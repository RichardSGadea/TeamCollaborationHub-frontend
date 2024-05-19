import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import "./Home.css"
import { useEffect, useState } from "react"
import CustomTable from "../../components/CustomTable/CustomTable"
import { bringGroups } from "../../services/apiCalls"
import CustomModal from "../../components/CustomModal/CustomModal"

export const Home = () => {

    const [myGroups, setMyGroups] = useState([])  

    const user = useSelector(getUserData)
    const token = user.token
    

    const actionsRow = [{ id: 1, name: "Groups" }]

    if (user.decoded.userRole === "teacher") {
        actionsRow.push({ id: 2, name: "Actions" })
    }

    useEffect(() => {
        const fetchGroups = async () => {
            //Function to retrieve our groups 
            const response = await bringGroups(token)
            setMyGroups(response)
        }
        fetchGroups()
    })


    return (
        <div className="container-fluid boxHome-design">
            <div className="row">
                <div className="col-12">
                    <h1 className="title-welcome">{`Welcome ${user.decoded.userRole}, this is your workspace!`}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex">
                     <h3 className="secondTitle-welcome">{`Your groups`}</h3>
                     {user.decoded.userRole === "teacher" && 
                     <CustomModal 
                        actionProp= "createGroup"
                     />
                     }
                </div>
            </div>

           
            <div className="row">
                <div className="col-12 col-lg-6">
                    <CustomTable
                        dataProp={myGroups}
                        columnProp={actionsRow}
                    />
                </div>
                <div className="col-12 col-lg-6">

                </div>
            </div>
        </div>

    )
}
