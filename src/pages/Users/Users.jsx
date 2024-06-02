import { useEffect, useState } from "react";
import "./Users.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import { bringGroupById, bringOutUsers, bringUsersFromGroup } from "../../services/apiCalls";
import CustomTable from "../../components/CustomTable/CustomTable";
import { notify } from "../../components/CustomToast/CustomToast";

export const Users = () => {

    // Retrieve the groupId from the URL parameters
    const { groupId } = useParams();

    // State to hold group data and users counts
    const [groupData, setGroupData] = useState(null);
    const [outsideUsers, setOutsideUsers] = useState(null)
    const [userAddedOrDelete, setUserAddedOrDelete] = useState(false)

    // Get user data and token from Redux store
    const user = useSelector(getUserData)
    const token = user.token

    // State to control page changes
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const [totalPagesGroup, setTotalPagesGroup] = useState()
    const [currentPageGroup, setCurrentPageGroup] = useState(1)


    // Define column names for the CustomTable component
    const columnNames = [{ id: 1, name: "FirstName" }, { id: 2, name: "LastName" }, { id: 3, name: "Email" }, { id: 4, name: "Actions" }]

    const handleUserAddedOrDeletedSuccess = () => {
        setUserAddedOrDelete(!userAddedOrDelete)
    }

    useEffect(() => {
        fetchGroupData(groupId)
        fetchOtherUsers(groupId)
    }, [groupId, currentPage, currentPageGroup, userAddedOrDelete])

    const fetchGroupData = async (id) => {
        //Retrieve group data
        try {
            const resGroup = await bringUsersFromGroup(token, id, currentPageGroup)
            setGroupData(resGroup);
            setTotalPagesGroup(resGroup.total_pages)

        } catch (error) {
            notify(error.response.data.message,'error')
        }
    };
    const fetchOtherUsers = async (id) => {
        //Retrieve group data
        try {
            const res = await bringOutUsers(token, id, currentPage)
            setOutsideUsers(res);
            setTotalPages(res.total_pages)

        } catch (error) {
            notify(error.response.data.message,'error')
        }
    };

    // Show loading message while fetching data
    if (!groupData || !outsideUsers) {
        return <div>Loading data...</div>;
    }

    return (
        <div className="container-fluid usersBox-style">
            <div className="row">
                <div className="col-12">
                    <h1 className="viewTitle-design">Add Students: {groupData.name}</h1>
                    <h2 className="studentsTitle-design">Users of this group</h2>
                    {/* Table to display users of the group */}
                    <CustomTable
                        dataProp={groupData.studentsFromGroup}
                        columnProp={columnNames}
                        numberGroup={groupId}
                        typeUsers={"inGroup"}
                        onAddedOrDeletedSuccess={handleUserAddedOrDeletedSuccess}
                        usersPerPage={groupData.per_page}
                    />
                    <div className="d-flex justify-content-center">
                        {/* Pagination controls for group users */}
                        <button className="btnPages" id="startPageBtn" disabled={currentPageGroup == 1 ? "disabled" : ""} onClick={() => {
                            setCurrentPageGroup(1)
                        }}></button>
                        <button className="btnPages" id="lastPageBtn" disabled={currentPageGroup == 1 ? "disabled" : ""} onClick={() => {
                            if (currentPageGroup > 1) {
                                setCurrentPageGroup(currentPageGroup - 1)
                            }
                        }}></button>
                        <button className="btnPages" id="nextPageBtn" disabled={currentPageGroup == totalPagesGroup ? "disabled" : ""} onClick={() => {
                            if (currentPageGroup < totalPagesGroup) {
                                setCurrentPageGroup(currentPageGroup + 1)
                            }
                        }}></button>
                        <button className="btnPages" id="finalPageBtn" disabled={currentPageGroup == totalPagesGroup ? "disabled" : ""} onClick={() => {
                            setCurrentPageGroup(totalPagesGroup)
                        }}></button>
                    </div>

                    <h2 className="studentsTitle-design">Other Students</h2>
                    <div className="d-flex justify-content-center">
                        {/* Pagination controls for users outside the group */}
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

                    {/* Table to display users outside the group */}
                    <CustomTable
                        dataProp={outsideUsers.studentsOutOfGroup}
                        columnProp={columnNames}
                        numberGroup={groupId}
                        typeUsers={"outGroup"}
                        onAddedOrDeletedSuccess={handleUserAddedOrDeletedSuccess}

                    />

                </div>
            </div>
        </div>
    )



}