import { useEffect, useState } from "react";
import "./Users.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import { bringGroupById, bringOutUsers, bringUsersFromGroup } from "../../services/apiCalls";
import CustomTable from "../../components/CustomTable/CustomTable";

export const Users = () => {

    const { groupId } = useParams();
    const [groupData, setGroupData] = useState(null);
    const [outsideUsers, setOutsideUsers] = useState(null)
    const [userAddedOrDelete, setUserAddedOrDelete] = useState(false)

    const user = useSelector(getUserData)
    const token = user.token

    //To control pages change
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const [totalPagesGroup, setTotalPagesGroup] = useState()
    const [currentPageGroup, setCurrentPageGroup] = useState(1)

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
            console.log(error);
        }
    };
    const fetchOtherUsers = async (id) => {
        //Retrieve group data
        try {
            const res = await bringOutUsers(token, id, currentPage)
            setOutsideUsers(res);
            setTotalPages(res.total_pages)

        } catch (error) {
            console.log(error);
        }
    };


    if (!groupData || !outsideUsers) {
        return <div>Loading data...</div>;
    }

    return (
        <div className="container-fluid usersBox-style">
            <div className="row">
                <div className="col-12">
                    <h1 className="viewTitle-design">Add Students: {groupData.name}</h1>
                    <h2 className="studentsTitle-design">Users of this group</h2>
                    <CustomTable
                        dataProp={groupData.studentsFromGroup}
                        columnProp={columnNames}
                        numberGroup={groupId}
                        typeUsers={"inGroup"}
                        onAddedOrDeletedSuccess={handleUserAddedOrDeletedSuccess}
                        usersPerPage={groupData.per_page}
                    />
                    <button disabled={currentPageGroup == 1 ? "disabled" : ""} onClick={() => {

                        if (currentPageGroup > 1) {
                            setCurrentPageGroup(currentPageGroup - 1)
                        }
                    }}>{"<-"}</button>
                    <button disabled={currentPageGroup == totalPagesGroup ? "disabled" : ""} onClick={() => {
                        if (currentPageGroup < totalPagesGroup) {
                            setCurrentPageGroup(currentPageGroup + 1)
                        }
                    }}>{"->"}</button>

                    <h2 className="studentsTitle-design">Other Students</h2>
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