import { getUserData } from "../../app/Slices/userSlice"
import { useSelector } from "react-redux"
import "./Tasks.css"
import CustomModal from "../../components/CustomModal/CustomModal"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { bringTasksFromGroup } from "../../services/apiCalls"
import CustomCard from "../../components/CustomCard/CustomCard"

export const Tasks = () => {

    const { groupId } = useParams()

    //About all tasks
    const [tasksData, setTasksData] = useState([])
    const [tasksToDo, setTasksToDo] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [tasksCompleted, setTasksCompleted] = useState([])

    //Controlled tasks states
    const [taskCreated, setTaskCreated] = useState(false);
    const [taskEdited, setTaskEdited] = useState(false);

    const user = useSelector(getUserData)
    const token = user.token

    const navigate = useNavigate()

    useEffect(() => {
        fetchTasksData(groupId)
    }, [groupId, taskCreated, taskEdited])

    const fetchTasksData = async (id) => {
        try {
            //get tasks data
            const data = await bringTasksFromGroup(token, id)
            setTasksData(data)
            setTasksToDo(data.filter((element) => element.stateId === 1))
            setTasksInProgress(data.filter((element) => element.stateId === 2))
            setTasksCompleted(data.filter((element) => element.stateId === 3))

        } catch (error) {
            console.log(error)
        }
    };

    //Handle to control tasks states
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
                    <button className="iconGoGroup-design" onClick={() => navigate(`/group/${groupId}`)}><img src="../../enterIcon.png" width="40px" height="40px" alt="" /></button>
                    <h1 className="viewTitle-design">Tasks</h1>
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