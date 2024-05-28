import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllGroups, getAllUsers } from "../../services/apiCalls"
import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import "./Admin.css"
import CustomTable from "../../components/CustomTable/CustomTable"

export const Admin = () => {

    const { infoId } = useParams()

    const [infoData, setInfoData] = useState(null)

    //To control pages change
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const user = useSelector(getUserData)
    const token = user.token

    const columnNamesUsers = [{ id: 1, name: "FirstName" }, { id: 2, name: "LastName" }, { id: 3, name: "Email" }, { id: 4, name: "Actions" }];
    const columnNamesGroups = [{ id: 1, name: "Name" }, { id: 2, name: "Users" }, { id: 3, name: "Tasks" }, { id: 4, name: "Actions" }]


    useEffect(() => {

        const fetchData = async () => {
            if (infoId === "1") {
                const res = await getAllUsers(token, currentPage)
                setInfoData(res)
                setTotalPages(res.total_pages)
            } else {
                const res = await getAllGroups(token, currentPage)
                setInfoData(res)
                setTotalPages(res.total_pages)
            }
        }
        fetchData()
    }, [currentPage])

    if (!infoData) {
        return <div>Loading data...</div>;
    }

    return (
        <div className="container-fluid adminBox-style">
            <div className="row">
                <div className="col-12">
                    <div className="h-100">
                        <CustomTable
                            dataProp={infoId === "1" ? infoData.users : infoData.groups}
                            columnProp={infoId === "1" ? columnNamesUsers : columnNamesGroups}
                            numberInfoData={infoId}
                            typeUsers={""}
                            usersPerPage={infoData.per_page}
                        />
                    </div>
                    <div className="h-50"> 
                        <button disabled={currentPage == 1 ? "disabled" : ""} onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1)
                            }
                        }}>{"<-"}</button>
                        <button disabled={currentPage == totalPages ? "disabled" : ""} onClick={() => {
                            if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}>{"->"}</button>
                    </div>

                </div>



            </div>

        </div>
    )

}