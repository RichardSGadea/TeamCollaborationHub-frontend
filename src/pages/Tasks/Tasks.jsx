import { getUserData } from "../../app/Slices/userSlice"
import { useSelector } from "react-redux"
import "./Tasks.css"
import CustomModal from "../../components/CustomModal/CustomModal"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { bringTasksFromGroup } from "../../services/apiCalls"
import CustomCard from "../../components/CustomCard/CustomCard"
import { notify } from "../../components/CustomToast/CustomToast"

export const Tasks = () => {

    // Get the groupId from URL parameters
    const { groupId } = useParams()

    // State for storing tasks
    const [tasksData, setTasksData] = useState([])
    const [tasksToDo, setTasksToDo] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [tasksCompleted, setTasksCompleted] = useState([])

    // Controlled states for task creation and editing
    const [taskCreated, setTaskCreated] = useState(false);
    const [taskEdited, setTaskEdited] = useState(false);

    // Get user data from Redux store
    const user = useSelector(getUserData)
    const token = user.token

    // Hook for navigation
    const navigate = useNavigate()

    // Effect to fetch tasks data when groupId, taskCreated, or taskEdited changes
    useEffect(() => {
        fetchTasksData(groupId)
    }, [groupId, taskCreated, taskEdited])

    // Function to fetch tasks data from the API
    const fetchTasksData = async (id) => {
        try {
            // Get tasks data from the API
            const data = await bringTasksFromGroup(token, id)
            setTasksData(data)
            setTasksToDo(data.filter((element) => element.stateId === 1)) // Filter tasks with state "To Do"
            setTasksInProgress(data.filter((element) => element.stateId === 2)) // Filter tasks with state "In Progress"
            setTasksCompleted(data.filter((element) => element.stateId === 3)) // Filter tasks with state "Completed"

        } catch (error) {
            notify(error.response.data.message, 'error') // Show error notification if API call fails
        }
    };

    // Handlers to control task creation and editing states
    const handleCreateSuccess = () => {
        setTaskCreated(!taskCreated);

    }
    const handleEditSuccess = () => {
        setTaskEdited(!taskEdited);

    }

    return (
        <div className="container-fluid tasksBox-style">
            <div className="row">
                <div className="col-12 d-flex">
                    {/* Button to navigate back to the group */}
                    <button className="iconGoGroup-design" onClick={() => navigate(`/group/${groupId}`)}><img src="../../enterIcon.png" width="40px" height="40px" alt="" /></button>
                    <h1 className="viewTitle-design">Tasks</h1>
                    {/* Conditionally render the modal for creating tasks if the user is a student */}
                    {user.decoded.userRole === "student" &&
                        <CustomModal
                            actionProp="createTask"
                            groupIdProp={groupId}
                            onCreateSuccess={handleCreateSuccess}
                        />}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <h3 className="text-danger">To Do</h3>
                                <div>
                                    {/* Render tasks in "To Do" state */}
                                    {tasksToDo.map((item) => {
                                        return (<CustomCard
                                            key={item.id}
                                            groupNumber={groupId}
                                            classNameProp={"taskToDo-design m-1 border-danger"}
                                            titleProp={item.name}
                                            createProp={item.createDate}
                                            deadlineProp={item.deadline}
                                            taskNumber={item.id}
                                            onEditSuccess={handleEditSuccess}
                                        />)
                                    })}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <h3 className="text-info">In Progress</h3>
                                <div>
                                    {/* Render tasks in "In Progress" state */}
                                    {tasksInProgress.map((item) => {
                                        return (<CustomCard
                                            key={item.id}
                                            groupNumber={groupId}
                                            classNameProp={"taskInProgress-design m-1 border-info"}
                                            titleProp={item.name}
                                            createProp={item.createDate}
                                            deadlineProp={item.deadline}
                                            taskNumber={item.id}
                                            onEditSuccess={handleEditSuccess}
                                        />)
                                    })}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <h3 className="text-success">Completed</h3>
                                <div>
                                    {/* Render tasks in "Completed" state */}
                                    {tasksCompleted.map((item) => {
                                        return (<CustomCard
                                            key={item.id}
                                            groupNumber={groupId}
                                            classNameProp={"taskCompleted-design m-1 border-success"}
                                            titleProp={item.name}
                                            createProp={item.createDate}
                                            deadlineProp={item.deadline}
                                            taskNumber={item.id}
                                            onEditSuccess={handleEditSuccess}
                                        />)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}