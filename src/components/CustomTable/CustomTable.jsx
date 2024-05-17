import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { getUserData } from "../../app/Slices/userSlice";
import "./CustomTable.css"

function CustomTable({ dataProp, columnProp }) {

    const user = useSelector(getUserData)

    return (
        <Table>
            <thead className="tableHeader">
                <tr>
                    {columnProp.map((item) => {
                        return (
                            <th  key={item.id}>{item.name}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {dataProp.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td><a href={`/group`}>{item.name}</a></td>
                            {user.decoded.userRole === "teacher" && <td></td>}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default CustomTable;
