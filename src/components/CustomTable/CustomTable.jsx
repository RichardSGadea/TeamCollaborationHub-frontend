import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { getUserData } from "../../app/Slices/userSlice";
import "./CustomTable.css"
import { Link } from "react-router-dom";

function CustomTable({ dataProp, columnProp }) {

    const user = useSelector(getUserData)

    return (
        <Table>
            <thead className="tableHeader">
                <tr>
                    {columnProp.map((item) => {
                        return (
                            <th key={item.id}>{item.name}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {dataProp.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td><Link to={`/group/${item.id}`}>{item.name}</Link></td>
                            {user.decoded.userRole === "teacher" &&
                                <td>
                                    <button className="iconActionsTeacher-design"><img src="../../trash.png" width="20px" height="20px" alt="" /></button>
                                    <button className="iconActionsTeacher-design"><img src="../../addStudentIcon.png" width="20px" height="20px" alt="" /></button>
                                </td>}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default CustomTable;
