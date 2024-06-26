import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { bringGroupById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";
import "./Group.css"
import CustomTable from "../../components/CustomTable/CustomTable";
import { notify } from "../../components/CustomToast/CustomToast";

export const Group = () => {

    // Retrieve the groupId from the URL parameters
    const { groupId } = useParams();

    // State to hold group data and task counts
    const [groupData, setGroupData] = useState(null);
    const [totalTasks, setTotalTasks] = useState({
        tasksToDo: 0,
        tasksInProgress: 0,
        tasksCompleted: 0,
    })

    // Define column names for the CustomTable component
    const columnNames = [{ id: 1, name: "FirstName" }, { id: 2, name: "LastName" }, { id: 3, name: "Email" }]

    // Get user data and token from Redux store
    const user = useSelector(getUserData)
    const token = user.token

    // Hook to navigate programmatically
    const navigate = useNavigate()

    // Fetch group data when component mounts or groupId changes
    useEffect(() => {
        fetchGroupData(groupId)
    }, [groupId])

    // Function to retrieve group data
    const fetchGroupData = async (id) => {
        try {
            const data = await bringGroupById(token, id)
            setGroupData(data);
            // Count tasks based on their states
            setTotalTasks({
                tasksToDo: (data.tasks.filter((element) => element.stateId === 1)).length,
                tasksInProgress: (data.tasks.filter((element) => element.stateId === 2)).length,
                tasksCompleted: (data.tasks.filter((element) => element.stateId === 3)).length,
            })
        } catch (error) {
            notify(error.response.data.message,'error')
        }
    };

    // Show loading message until data is fetched
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
                    <div className="d-flex mt-5">
                        <h2 className="groupName-design"  >Tasks</h2>
                        <button className="iconGoTasks-design" onClick={() => navigate(`/group/${groupId}/tasks`)}><img src="../../enterIcon.png" width="20px" height="20px" alt="" /></button>
                    </div>
                    <p className="statesTasks-design">Tasks To Do: <span className="text-danger">{totalTasks.tasksToDo}</span></p>
                    <p className="statesTasks-design">Tasks In Progress: <span className="text-info">{totalTasks.tasksInProgress}</span></p>
                    <p className="statesTasks-design">Completed Tasks: <span className="text-success">{totalTasks.tasksCompleted}</span></p>
                </div>
            </div>

        </div>
    )
}