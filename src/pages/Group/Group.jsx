import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { bringGroupById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import "./Group.css"
import CustomTable from "../../components/CustomTable/CustomTable";

export const Group = () => {

    const { groupId } = useParams();
    const [groupData, setGroupData] = useState(null);
    const [totalTasks, setTotalTasks] = useState({
        tasksToDo: 0,
        tasksInProgress: 0,
        tasksCompleted: 0,
    })

    const columnNames = [{ id: 1, name: "FirstName" }, { id: 2, name: "LastName" }, { id: 3, name: "Email" }]

    const user = useSelector(getUserData)
    const token = user.token

    const navigate = useNavigate()

    useEffect(() => {
        fetchGroupData(groupId)
    }, [groupId])

    const fetchGroupData = async (id) => {
        //Retrieve group data
        try {
            const data = await bringGroupById(token, id)
            setGroupData(data);
            console.log(data);
            setTotalTasks({
                tasksToDo: (data.tasks.filter((element) => element.stateId === 1)).length,
                tasksInProgress: (data.tasks.filter((element) => element.stateId === 2)).length,
                tasksCompleted: (data.tasks.filter((element) => element.stateId === 3)).length,
            })
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
                    <h2 className="groupName-design mt-2">Users</h2>
                    <CustomTable
                        dataProp={groupData.users}
                        columnProp={columnNames}
                        numberGroup={groupId}
                    />
                    <h2 className="groupName-design mt-5" onClick={() => navigate(`/group/${groupId}/tasks`)}>Tasks</h2>
                    <p className="statesTasks-design">Tasks To Do: <span className="text-danger">{totalTasks.tasksToDo}</span></p>
                    <p className="statesTasks-design">Tasks In Progress: <span className="text-info">{totalTasks.tasksInProgress}</span></p>
                    <p className="statesTasks-design">Completed Tasks: <span className="text-success">{totalTasks.tasksCompleted}</span></p>
                </div>
            </div>

        </div>
    )
}