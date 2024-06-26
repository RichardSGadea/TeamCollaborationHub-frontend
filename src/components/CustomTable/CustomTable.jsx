import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { getUserData } from "../../app/Slices/userSlice";
import "./CustomTable.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addUserGroup, deleteUserGroup } from "../../services/apiCalls";
import CustomModal from "../CustomModal/CustomModal";
import AdminControlModal from "../AdminControlModal/AdminControlModal";

function CustomTable({ dataProp, columnProp, numberGroup, numberInfoData, typeUsers, onAddedOrDeletedSuccess,onEditSuccess, usersPerPage, onUpdateGroup }) {


    const [locationUrl, setLocationUrl] = useState("")// State to hold the current location URL
    const location = useLocation() // Get the current location from useLocation hook

    // Retrieve user data from the Redux store
    const user = useSelector(getUserData)
    const token = user.token


    useEffect(() => {
        const fetchUrl = () => {
            setLocationUrl(location.pathname) // Update the location URL state when the location changes
        }
        fetchUrl()
    }, [locationUrl])

    // Function to add a user to a group
    const addUserToGroup = async (userId) => {
        try {
            const res = await addUserGroup(token, numberGroup, userId)
            onAddedOrDeletedSuccess()
        } catch (error) {
            console.log(error);
        }
    }

     // Function to delete a user from a group
    const deleteUserToGroup = async (userId) => {
        try {
            const res = await deleteUserGroup(token, numberGroup, userId)
            onAddedOrDeletedSuccess()
        } catch (error) {
            console.log(error);
        }
    }

    //Control empty table rows
    let placeholders = []

    if (locationUrl === `/group/${numberGroup}/users` || locationUrl === `/admin/${numberInfoData}`) {
        if (dataProp.length < usersPerPage) {

            placeholders = Array(usersPerPage - dataProp.length).fill({});
        }
    }

    return (
        <Table>
            <thead className={typeUsers === "" ? "tableHeader" : typeUsers === "outGroup" ? "otherTableHeader" : "tableHeader"}>
                <tr>
                    {columnProp.map((item) => {
                        return (
                            <th key={item.id}>{item.name}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    locationUrl === "/" ? ((
                        dataProp.map((item) => {
                            return (<tr key={item.id}>
                                <td><Link to={`/group/${item.id}`}>{item.name}</Link></td>
                                {user.decoded.userRole === "teacher" &&
                                    <td>
                                        <Link to={`/group/${item.id}/users`}><button className="iconActionsTeacher-design"><img src="../../addStudentIcon.png" width="20px" height="20px" alt="" /></button></Link>
                                        <CustomModal
                                            actionProp={"modifyGroup"}
                                            groupIdProp={item.id}
                                            onUpdateGroupSuccess={onUpdateGroup}
                                        />
                                        <CustomModal
                                            actionProp={"deleteGroup"}
                                            groupIdProp={item.id}
                                            onUpdateGroupSuccess={onUpdateGroup}

                                        />
                                    </td>}
                            </tr>)
                        }))) : locationUrl === `/group/${numberGroup}` || locationUrl === `/group/${numberGroup}/users` ?
                        (<>
                            {dataProp.map((item) => (
                                <tr key={item.id}>

                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    {locationUrl === `/group/${numberGroup}/users` &&
                                        <td>
                                            {item.roleId !== 2 ? (
                                                <button className="iconActionsTeacher-design" onClick={() => {
                                                    typeUsers === "inGroup" ?
                                                        deleteUserToGroup(item.id)
                                                        :
                                                        addUserToGroup(item.id)
                                                }}>
                                                    <img src={typeUsers === "inGroup" ? "../../lessIcon.png" : "../../plusIcon.png"} width="20px" height="20px" alt="" />
                                                </button>) : ("TEACHER")}
                                        </td>
                                    }
                                </tr>
                            ))}
                            {locationUrl === `/group/${numberGroup}/users` &&
                                placeholders.map((_, index) => (
                                    <tr key={`emptyRow-${index}`}>
                                        <td colSpan={4} className="emptyRow-design"></td>
                                    </tr>
                                ))}
                        </>
                        ) : locationUrl === `/admin/${numberInfoData}` ? (
                            <>
                                {dataProp.map((item) => (
                                    <tr key={item.id}>
                                        <td>{numberInfoData === "1" ? item.firstName : item.name}</td>
                                        <td>{numberInfoData === "1" ? item.lastName : item.users.length}</td>
                                        <td className={numberInfoData === "1" && item.isActive === false ? "rowData-design text-danger ":""}>{numberInfoData === "1" ? item.email : item.tasks.length}</td>
                                        <td>
                                            <AdminControlModal
                                                actionProp={numberInfoData === "1" ? "editUser" : "editGroup"}
                                                dataIdProp={item.id}
                                                editSuccess={onEditSuccess}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {locationUrl === `/admin/${numberInfoData}` &&
                                    placeholders.map((_, index) => (
                                        <tr key={`emptyRow-${index}`}>
                                            <td colSpan={4} className="emptyRow-design"></td>
                                        </tr>
                                    ))}
                            </>
                        ) : (<></>)
                }
            </tbody>
        </Table>
    );
}

export default CustomTable;


