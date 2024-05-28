import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import "./Home.css"
import { useEffect, useState } from "react"
import CustomTable from "../../components/CustomTable/CustomTable"
import { bringGroups } from "../../services/apiCalls"
import CustomModal from "../../components/CustomModal/CustomModal"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const [myGroups, setMyGroups] = useState([])

    const navigate = useNavigate()

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
                    {user.decoded.userRole !== "admin" ? (
                        <>
                            <h3 className="secondTitle-welcome">{`Your groups`}</h3>
                            {user.decoded.userRole === "teacher" &&
                                <CustomModal
                                    actionProp="createGroup"
                                />
                            }
                        </>
                    ) : (
                        <>
                            <h3 className="secondTitle-welcome">{`Get info about`}</h3>
                        </>
                    )
                    }
                </div>
            </div>


            <div className="row h-50">
                <div className="col-12 col-lg-6">
                    {user.decoded.userRole !== "admin" ? (
                        <CustomTable
                            dataProp={myGroups}
                            columnProp={actionsRow}
                        />
                    ) : (
                        <div className="boxButtonsAdmin-style d-flex justify-content-center align-items-center h-100">
                            <CustomButton
                                title={"All users"}
                                classNameProp={"regularButtonClass btnControl-style"}
                                functionEmit={()=>navigate("/admin/1")}
                            />
                            <CustomButton
                                title={"All groups"}
                                classNameProp={"regularButtonClass btnControl-style"}
                                functionEmit={()=>navigate("/admin/2")}
                            />
                        </div>
                    )
                    }

                </div>
                <div className="col-12 col-lg-6">

                </div>
            </div>
        </div>

    )
}
