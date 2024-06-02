import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllGroups, getAllUsers } from "../../services/apiCalls"
import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import "./Admin.css"
import CustomTable from "../../components/CustomTable/CustomTable"
import AdminControlModal from "../../components/AdminControlModal/AdminControlModal"

export const Admin = () => {

    // Retrieve the information of the URL parameters, to know what to render
    const { infoId } = useParams()

    // State to store information data, edit success, and create success status
    const [infoData, setInfoData] = useState(null)
    const [editSuccess, setEditSuccess] = useState(false)
    const [createSuccess, setCreateSuccess] = useState(false)

    // State to control pagination
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    // Get user data from Redux store
    const user = useSelector(getUserData)
    const token = user.token

    // Column names for users and groups tables
    const columnNamesUsers = [{ id: 1, name: "FirstName" }, { id: 2, name: "LastName" }, { id: 3, name: "Email" }, { id: 4, name: "Actions" }];
    const columnNamesGroups = [{ id: 1, name: "Name" }, { id: 2, name: "Users" }, { id: 3, name: "Tasks" }, { id: 4, name: "Actions" }]

    // Handlers for edit and create success
    const handleEditSuccess = () => {
        setEditSuccess(!editSuccess);
    }

    const handleCreateSuccess = () => {
        setCreateSuccess(!createSuccess);
    }

    // Effect to fetch user or group data based on `infoId`
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
    }, [currentPage, editSuccess])

    // Show loading message while fetching data
    if (!infoData) {
        return <div>Loading data...</div>;
    }

    return (
        <div className="container-fluid adminBox-style">
            <div className="row">
                <div className="col-12 p-4">
                    {/* Admin control modal for creating users */}
                    <div>
                        {infoId === "1" &&
                            <AdminControlModal
                                actionProp={"createUser"}
                                onCreateSuccess={handleCreateSuccess}
                            />
                        }
                    </div>
                    <div className="h-100">
                        {/* Custom table to display users or groups */}
                        <CustomTable
                            dataProp={infoId === "1" ? infoData.users : infoData.groups}
                            columnProp={infoId === "1" ? columnNamesUsers : columnNamesGroups}
                            numberInfoData={infoId}
                            typeUsers={""}
                            usersPerPage={infoData.per_page}
                            onEditSuccess={handleEditSuccess}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        {/* Pagination controls */}
                        <button className="btnPages" id="startPageBtn" disabled={currentPage == 1 ? "disabled" : ""} onClick={() => {
                            setCurrentPage(1)
                        }}></button>
                        <button className="btnPages" id="lastPageBtn" disabled={currentPage == 1 ? "disabled" : ""} onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1)
                            }
                        }}></button>
                        <button className="btnPages" id="nextPageBtn" disabled={currentPage == totalPages ? "disabled" : ""} onClick={() => {
                            if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}></button>
                        <button className="btnPages" id="finalPageBtn" disabled={currentPage == totalPages ? "disabled" : ""} onClick={() => {
                            setCurrentPage(totalPages)
                        }}></button>
                    </div>

                </div>
            </div>
        </div>
    )
}