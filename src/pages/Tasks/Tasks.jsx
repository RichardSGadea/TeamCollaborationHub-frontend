import { getUserData } from "../../app/Slices/userSlice"
import { useSelector } from "react-redux"
import "./Tasks.css"
import CustomModal from "../../components/CustomModal/CustomModal"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { bringTasksFromGroup } from "../../services/apiCalls"
import CustomCard from "../../components/CustomCard/CustomCard"

export const Tasks = () => {

    const { groupId } = useParams()

    const [tasksData, setTasksData] = useState([])
    const [tasksToDo, setTasksToDo] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [tasksCompleted, setTasksCompleted] = useState([])
    const [taskCreated, setTaskCreated] = useState(false);

    const user = useSelector(getUserData)
    const token = user.token


    useEffect(() => {
        fetchTasksData(groupId)
    }, [groupId,taskCreated])

    const fetchTasksData = async (id) => {
        try {
            const data = await bringTasksFromGroup(token, id)
            // console.log(data);
            setTasksData(data)
            setTasksToDo(data.filter((element) => element.stateId === 1))
            setTasksInProgress(data.filter((element) => element.stateId === 2))
            setTasksCompleted(data.filter((element) => element.stateId === 3))

        } catch (error) {
            console.log(error)
        }
    };

    const handleCreateSuccess = () => {
        setTaskCreated(!taskCreated);
        
    }

    // if (!tasksToDo) {
    //     return <div>Loading data...</div>;
    // }

    return (
        <div className="container-fluid tasksBox-style">
            <div className="row">
                <div className="col-12 d-flex">
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
                                        return(<CustomCard
                                            key={item.id}
                                            classNameProp={"taskToDo-design m-1 border-danger"}
                                            titleProp={item.name}
                                            createProp={item.createDate}
                                            deadlineProp={item.deadline}
                                        />)
                                    })}
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <h3 className="text-info">In Progress</h3>
                                <div>

                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <h3 className="text-success">Completed</h3>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}