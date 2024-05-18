import { useEffect, useState } from "react";
import "./Users.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import { bringGroupById, bringOutUsers } from "../../services/apiCalls";
import CustomTable from "../../components/CustomTable/CustomTable";

export const Users = () => {

    const { groupId } = useParams();
    const [groupData, setGroupData] = useState(null);
    const [outsideUsers, setOutsideUsers] = useState(null)

    const user = useSelector(getUserData)
    const token = user.token

    //To control pages change
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const columnNames = [{ id: 1, name: "FirstName" }, { id: 2, name: "LastName" }, { id: 3, name: "Email" }, { id: 4, name: "Actions" }]

    useEffect(() => {
        fetchGroupData(groupId)
        fetchOtherUsers(groupId)
    }, [groupId,currentPage])

    const fetchGroupData = async (id) => {
        //Retrieve group data
        try {
            const resGroup = await bringGroupById(token, id)
            setGroupData(resGroup);

        } catch (error) {
            console.log(error);
        }
    };
    const fetchOtherUsers = async (id) => {
        //Retrieve group data
        try {
            const res = await bringOutUsers(token, id, currentPage)
            setOutsideUsers(res.studentsOutOfGroup);
            setTotalPages(res.total_pages)
            console.log(res);

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
                        dataProp={groupData.users}
                        columnProp={columnNames}
                        numberGroup={groupId}
                        typeUsers={"inGroup"}
                    />
                    <h2 className="studentsTitle-design">Other Students</h2>
                    <CustomTable
                        dataProp={outsideUsers}
                        columnProp={columnNames}
                        numberGroup={groupId}
                        typeUsers={"outGroup"}
                    />
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
    )



}