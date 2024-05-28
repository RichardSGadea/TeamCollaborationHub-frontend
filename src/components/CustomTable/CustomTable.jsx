import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { getUserData } from "../../app/Slices/userSlice";
import "./CustomTable.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addUserGroup, deleteUserGroup } from "../../services/apiCalls";
import CustomModal from "../CustomModal/CustomModal";

function CustomTable({ dataProp, columnProp, numberGroup, typeUsers, onAddedOrDeletedSuccess,usersPerPage }) {

    
    const [locationUrl, setLocationUrl] = useState("")
    const location = useLocation()

    //Control user logged
    const user = useSelector(getUserData)
    const token = user.token

    const per_page=usersPerPage

    useEffect(() => {
        const fetchUrl = () => {
            setLocationUrl(location.pathname)
        }
        fetchUrl()
    }, [locationUrl])

    const addUserToGroup = async (userId) => {
        try {
            const res = await addUserGroup(token, numberGroup, userId)
            onAddedOrDeletedSuccess()
        } catch (error) {
            console.log(error);
        }
    }
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

    if(locationUrl === `/group/${numberGroup}/users`){
        if(dataProp.length < usersPerPage){

            placeholders = Array(usersPerPage-dataProp.length).fill({});
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
                                        />
                                        <CustomModal
                                            actionProp={"deleteGroup"}
                                            groupIdProp={item.id}
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
                        ) : (<></>)
                }
            </tbody>
        </Table>
    );
}

export default CustomTable;


