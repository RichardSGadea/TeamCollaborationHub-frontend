import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { bringGroupById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import "./Group.css"
import CustomTable from "../../components/CustomTable/CustomTable";

export const Group = () => {

    const { groupId } = useParams();
    const [groupData, setGroupData] = useState(null);

    const columnNames = [{id:1,name:"FirstName"},{id:2,name:"LastName"},{id:3,name:"Email"}]

    const user = useSelector(getUserData)
    const token = user.token

    useEffect(() => {
        fetchGroupData(groupId)
    }, [groupId])

    const fetchGroupData = async (id) => {
        //Retrieve group data
        try {
            const data = await bringGroupById(token, id)
            setGroupData(data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!groupData) {
        return <div>Loading data...</div>;
    }

    return (
        <div className="container-fluid groupBox-style">
            <div className="row">
                <div className="col-12 col-lg-4">
                    <h1 className="viewTitle-design">Group</h1>
                    <div>
                        <h2 className="groupName-design">{groupData.name}</h2>
                    </div>
                </div>
                <div className="col-12 col-lg-7">
                    <h2 className="groupName-design mt-2">Students</h2>
                    <CustomTable 
                        dataProp={groupData.users}
                        columnProp={columnNames}
                        numberGroup={groupId}
                    />
                    <h2 className="groupName-design mt-5">Tasks</h2>
                    <p className="statesTasks-design">Tasks To Do: <span className="text-danger"></span></p>
                    <p className="statesTasks-design">Tasks In Progress: <span className="text-info"></span></p>
                    <p className="statesTasks-design">Completed Tasks: <span className="text-success"></span></p>
                </div>
            </div>

        </div>
    )
}