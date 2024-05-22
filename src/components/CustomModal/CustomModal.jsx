import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import { CustomInput } from '../CustomInput/CustomInput';
import { bringGroupById, createNewGroup, createTask, updateGroupById } from '../../services/apiCalls';

function CustomModal({ actionProp, groupIdProp, onCreateSuccess }) {
    const [show, setShow] = useState(false);

    const [groupData, setGroupData] = useState({
        nameGroup: ""
    })

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        estimatedHours: 0,
        deadline: ""
    })

    const handleClose = () => setShow(false);
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
            }else if (actionProp === "createTask") {
                const res = await createTask(token, groupIdProp, taskData)
                onCreateSuccess()
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


    return (
        <>
            {user.decoded.userRole !== "teacher" ? (
                actionProp === "createTask" ? (<button onClick={handleShow} className="iconActionsTeacher-design"><img src="../../plusIcon2.png" width="20px" height="20px" alt="" /></button>) : (
                    <Button variant="primary" onClick={handleShow}>
                        Launch demo modal
                    </Button>)
            ) : actionProp === "modifyGroup" ? (
                <button onClick={() => {
                    handleShow()
                    fetchOneGroup(groupIdProp)
                }} className="iconActionsTeacher-design"><img src="../../updateIcon.png" width="20px" height="20px" alt="" /></button>
            ) : (
                <button onClick={handleShow} className="iconActionsTeacher-design"><img src="../../plusIcon2.png" width="20px" height="20px" alt="" /></button>
            )}
            < Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {actionProp === "createGroup" ? "New Group" : actionProp === "modifyGroup" ? "Modify Group" : actionProp === "createTask" ? "New Task" : "Modal heading"}
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
                    ) : (
                        "Woohoo, you are reading this text in a modal!"
                    )
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        saveData()
                        handleClose()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default CustomModal;