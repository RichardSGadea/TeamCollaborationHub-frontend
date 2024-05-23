import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import { CustomInput } from '../CustomInput/CustomInput';
import { bringGroupById, bringTaskById, createNewGroup, createTask, updateGroupById, updateTaskById } from '../../services/apiCalls';
import "./CustomModal.css"

function CustomModal({ actionProp, groupIdProp, taskIdProp, onCreateSuccess,editSuccess }) {
    const [show, setShow] = useState(false);

    const [groupData, setGroupData] = useState({
        nameGroup: ""
    })

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        estimatedHours: 0,
        deadline: "",
        spentHours: 0,
        stateId: 0,
    })

    const [isEditing, setIsEditing] = useState(false)

    const handleClose = () => {
        setShow(false);
        setIsEditing(false)
    };
    const handleShow = () => setShow(true);

    const user = useSelector(getUserData)
    const token = user.token

    const inputHandler = (e) => {
        setGroupData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    const inputTaskHandler = (e) => {
        setTaskData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    const saveData = async () => {
        try {
            if (actionProp === "createGroup") {
                const res = await createNewGroup(token, groupData)
            }
            else if (actionProp === "modifyGroup") {
                const res = await updateGroupById(token, groupIdProp, groupData)
            } else if (actionProp === "createTask") {
                const res = await createTask(token, groupIdProp, taskData)
                onCreateSuccess()
            } else if (actionProp === "editTask") {
                const res = await updateTaskById(token, groupIdProp, taskData, taskIdProp)
                editSuccess()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const fetchOneGroup = async (groupId) => {
        try {
            const res = await bringGroupById(token, groupId);
            setGroupData({ nameGroup: res.name })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOneTask = async (groupIdProp, taskIdProp) => {
        try {
            const res = await bringTaskById(token, groupIdProp, taskIdProp);
            setTaskData(res)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {user.decoded.userRole !== "teacher" ? (
                actionProp === "createTask" ? (<button onClick={handleShow} className="iconActionsTeacher-design"><img src="../../plusIcon2.png" width="20px" height="20px" alt="" /></button>) : actionProp === "editTask" ? (
                    <button onClick={() => {
                        handleShow()
                        fetchOneTask(groupIdProp, taskIdProp)
                    }} className="iconActionsTeacher-design"><img src="../../readIcon.png" width="20px" height="20px" alt="" /></button>
                ) : (
                    <Button variant="primary" onClick={handleShow}>
                        Launch demo modal
                    </Button>)
            ) : actionProp === "modifyGroup" ? (
                <button onClick={() => {
                    handleShow()
                    fetchOneGroup(groupIdProp)
                }} className="iconActionsTeacher-design"><img src="../../updateIcon.png" width="20px" height="20px" alt="" /></button>
            ) : actionProp === "editTask" ? (
                <button onClick={() => {
                    handleShow()
                    fetchOneTask(groupIdProp, taskIdProp)
                }} className="iconActionsTeacher-design"><img src="../../readIcon2.png" width="20px" height="20px" alt="" /></button>
            ) : (
                <button onClick={handleShow} className="iconActionsTeacher-design"><img src="../../plusIcon.png" width="20px" height="20px" alt="" /></button>
            )}
            < Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {actionProp === "createGroup" ? "New Group" : actionProp === "modifyGroup" ? "Modify Group" : actionProp === "createTask" ? "New Task" : actionProp === "editTask" ? (
                            <div className='d-flex justify-content-between'>
                                <h3>{taskData.name}</h3>
                                <div className='d-flex'>
                                    {user.decoded.userRole !== "teacher" &&
                                        <>
                                            <button className="iconActionsTeacher-design"><img src="../../trash.png" width="20px" height="20px" alt="" /></button>
                                            <button className="iconActionsTeacher-design" onClick={() => setIsEditing(!isEditing)}><img src="../../updateIcon.png" width="20px" height="20px" alt="" /></button>
                                        </>
                                    }
                                </div>
                            </div>
                        ) :
                            "Modal heading"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actionProp === "createGroup" ? (
                        <>
                            <label>Group name:</label>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"nameGroup"}
                                placeholderProp={"Enter the name"}
                                handlerProp={(e) => inputHandler(e)}
                            />
                        </>
                    ) : actionProp === "modifyGroup" ? (
                        <>
                            <label>Group name:</label>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"nameGroup"}
                                placeholderProp={"Enter the name"}
                                handlerProp={(e) => inputHandler(e)}
                                value={groupData.nameGroup}
                            />
                        </>
                    ) : actionProp === "createTask" ? (
                        <>
                            <label>Task Name:</label>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"name"}
                                placeholderProp={"Task"}
                                handlerProp={(e) => inputTaskHandler(e)}
                            />
                            <br />
                            <label>Description:</label>
                            <br />
                            <textarea id="descriptionTask" name="description" rows="5" cols="33" onChange={(e) => inputTaskHandler(e)}>
                            </textarea>
                            <br />
                            <label>Estimated Hours:</label>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"estimatedHours"}
                                handlerProp={(e) => inputTaskHandler(e)}
                            />
                            <br />
                            <label>Limit Date:</label>
                            <CustomInput
                                typeProp={"datetime-local"}
                                nameProp={"deadline"}
                                handlerProp={(e) => inputTaskHandler(e)}
                            />
                        </>
                    ) : actionProp === "editTask" ? (
                        <div>
                            <label>Description:</label>
                            <br />
                            <textarea disabled={!isEditing} id="descriptionTask" name="description" rows="5" cols="33" onChange={(e) => inputTaskHandler(e)} value={taskData.description}>
                            </textarea>
                            <br />
                            <label>Estimated Hours:</label>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"estimatedHours"}
                                handlerProp={(e) => inputTaskHandler(e)}
                                isDisabled={true}
                                value={taskData.estimatedHours}
                            />
                            <br />
                            <label>Spent Hours:</label>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"spentHours"}
                                handlerProp={(e) => inputTaskHandler(e)}
                                isDisabled={!isEditing}
                                value={taskData.spentHours || ''}
                            />
                            <br />
                            <label>Task state:</label>
                            <br />
                            <label htmlFor="state1">To Do</label>
                            <CustomInput typeProp={"radio"} id="state1" nameProp={"stateId"} handlerProp={(e) => inputTaskHandler(e)} value={"1"} checked={(taskData.stateId).toString() === "1"} isDisabled={!isEditing} />
                            <br />
                            <label htmlFor="state2">In Progress</label>
                            <CustomInput typeProp={"radio"} id="state2" nameProp={"stateId"} handlerProp={(e) => inputTaskHandler(e)} value={"2"} checked={(taskData.stateId).toString() === "2"} isDisabled={!isEditing} />
                            <br />
                            <label htmlFor="state3">Completed</label>
                            <CustomInput typeProp={"radio"} id="state3" nameProp={"stateId"} handlerProp={(e) => inputTaskHandler(e)} value={"3"} checked={(taskData.stateId).toString() === "3"} isDisabled={!isEditing} />
                        </div>
                    ) : (

                        "Woohoo, you are reading this text in a modal!"
                    )
                    }

                </Modal.Body>
                <Modal.Footer>
                    {actionProp === "editTask" ? (
                        <>
                            <Button className='btnCustomModal-design' variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            {user.decoded.userRole !== "teacher" &&
                                <Button disabled={!isEditing && true} className='btnCustomModal-design' variant="primary" onClick={() => {
                                    saveData()
                                    handleClose()
                                }}>
                                    Save Changes
                                </Button>
                            }
                        </>
                    ) : (
                        <>
                            <Button className='btnCustomModal-design' variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className='btnCustomModal-design' variant="primary" onClick={() => {
                                saveData()
                                handleClose()
                            }}>
                                Save Changes
                            </Button>
                        </>
                    )
                    }

                </Modal.Footer>
            </Modal >
        </>
    );
}

export default CustomModal;