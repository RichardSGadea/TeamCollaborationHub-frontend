import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomInput } from '../CustomInput/CustomInput';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import { bringGroupById, bringOneGroupById, bringOneUserData, createUser, updateOneUserData } from '../../services/apiCalls';
import { notify } from '../CustomToast/CustomToast';

function AdminControlModal({ actionProp, dataIdProp, editSuccess, onCreateSuccess }) {

    // State for controlling modal visibility
    const [show, setShow] = useState(false);

     // State for controlling edit mode or locking mode
    const [areYouEditing, setAreYouEditing] = useState(true)
    const [areYouLocking, setAreYouLocking] = useState(false)

     // State for holding user/group/tasks data
    const [infoData, setInfoData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isActive: '',
    })
    const [infoDataGroup, setInfoDataGroup] = useState({})
    const [totalTasks, setTotalTasks] = useState({
        tasksToDo: 0,
        tasksInProgress: 0,
        tasksCompleted: 0,
    })

    // State for holding new user data
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })

    // Get user data from Redux store
    const user = useSelector(getUserData)
    const token = user.token

    // Functions to handle modal show/hide
    const handleClose = () => { setShow(false); setAreYouEditing(true) };
    const handleShow = () => setShow(true);

    // Function to handle input change for user data
    const inputHandler = (e) => {
        setInfoData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    // Function to handle input change for new user data
    const inputNewUserHandler = (e) => {
        setNewUser((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    // Fetch data based on modal visibility and action type
    useEffect(() => {
        if (show) {
            const fetchData = async () => {
                try {
                    if (actionProp === "editUser") {
                        try {
                            const res = await bringOneUserData(token, dataIdProp)
                            setInfoData({
                                firstName: res.firstName || '',
                                lastName: res.lastName || '',
                                email: res.email || '',
                                password: res.password || '',
                                isActive: res.isActive || '',
                                roleId: res.roleId
                            })
                        } catch (error) {
                            notify(error.response.data.message,'error')
                        }

                    } else if (actionProp === "editGroup") {
                        const res = await bringOneGroupById(token, dataIdProp)
                        setInfoDataGroup(res)
                        setTotalTasks({
                            tasksToDo: (res.tasks.filter((element) => element.stateId === 1)).length,
                            tasksInProgress: (res.tasks.filter((element) => element.stateId === 2)).length,
                            tasksCompleted: (res.tasks.filter((element) => element.stateId === 3)).length,
                        })

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }
    }, [show, actionProp, dataIdProp])

    // Function to save data
    const saveData = async () => {
        if (actionProp === "editUser") {
            try {
                const res = await updateOneUserData(token, dataIdProp, infoData)
                editSuccess()
                setAreYouEditing(true)
                setAreYouLocking(false)
            } catch (error) {
                notify(error.response.data.message,'error')
            }
        }else if (actionProp === "createUser") {
            try {
                const res = await createUser(token, newUser)
                onCreateSuccess()
            } catch (error) {
                notify(error.response.data.message,'error')
            }
        }
    }

    if (!infoData) {
        return <div>Loading...</div>
    }

    return (
        <>
            {actionProp === "editUser" ? (
                <button className="iconActionsTeacher-design" onClick={() => {
                    handleShow()
                }}><img className='iconInfo-design' src="../../searchIcon.png" width="20px" height="20px" alt="" />
                </button>
            ) : actionProp === "editGroup" ? (
                <button className="iconActionsTeacher-design" onClick={() => {
                    handleShow()
                }}><img className='iconInfo-design' src="../../searchIcon.png" width="20px" height="20px" alt="" />
                </button>
            ): actionProp === "createUser" ? (
                <>
                <button className="iconActionsTeacher-design" onClick={() => {
                    handleShow()
                }}><img className='iconInfo-design' src="../../plusIcon2.png" width="20px" height="20px" alt="" /></button>
                </>
            ) : (<Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>)}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex'>{actionProp === "editUser" ? (
                        <>
                            <h3>User Info</h3>

                            {infoData.roleId !== 1 &&
                                (<>
                                    <button className="iconActionsTeacher-design" onClick={() => {
                                        setAreYouEditing(!areYouEditing)
                                    }}><img src="../../updateIcon.png" width="20px" height="20px" alt="" />
                                    </button>
                                    {!areYouEditing && ((
                                        <>
                                            <button className="iconActionsTeacher-design" onClick={() => {
                                                setAreYouLocking(!areYouLocking)
                                                setInfoData((prevSate) => ({
                                                    ...prevSate,
                                                    isActive: !infoData.isActive
                                                }));
                                            }}><img src={infoData.isActive ? "../../lockIcon.png" : "../../activeIcon.png"} width="20px" height="20px" alt="" />
                                            </button>
                                            {areYouLocking === true && (
                                                <button className="iconActionsTeacher-design" onClick={() => {
                                                    saveData()
                                                    setShow()
                                                }}><img src="../../confirmIcon.png" width="20px" height="20px" alt="" />
                                                </button>
                                            )
                                            }
                                        </>
                                    )

                                    )}
                                </>)
                            }

                        </>
                    ) : actionProp === "editGroup" ? ("Group Info") : actionProp === "createUser" ? ("Create Teacher") :""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{actionProp === "editUser" ? (
                    <div className='container'>
                        <div className='row'>
                            <div className="col-3 d-flex flex-column">
                                <div className="row h-25"><label>FirstName:</label></div>
                                <div className="row h-25"><label>LastName:</label></div>
                                <div className="row h-25"><label>Email:</label></div>
                                <div className="row h-25"><label>Password:</label></div>
                            </div>
                            <div className="col-9">
                                <CustomInput
                                    classProp={"adminControl-input-design"}
                                    typeProp={"text"}
                                    nameProp={"firstName"}
                                    isDisabled={areYouEditing}
                                    value={infoData.firstName}
                                    handlerProp={inputHandler}
                                />
                                <CustomInput
                                    classProp={"adminControl-input-design"}
                                    typeProp={"text"}
                                    nameProp={"lastName"}
                                    isDisabled={areYouEditing}
                                    value={infoData.lastName}
                                    handlerProp={inputHandler}

                                />
                                <CustomInput
                                    classProp={"adminControl-input-design"}
                                    typeProp={"email"}
                                    nameProp={"email"}
                                    isDisabled={areYouEditing}
                                    value={infoData.email}
                                    handlerProp={inputHandler}

                                />
                                <CustomInput
                                    classProp={"adminControl-input-design"}
                                    typeProp={"password"}
                                    nameProp={"password"}
                                    isDisabled={areYouEditing}
                                    value={infoData.password}
                                    handlerProp={inputHandler}

                                />
                            </div>
                        </div>


                    </div>
                ) : actionProp === "editGroup" ? (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h3>{`${infoDataGroup.id} -- ${infoDataGroup.name}`}</h3>
                                <div>
                                    <p className="statesTasks-design">Tasks To Do: <span className="text-danger">{totalTasks.tasksToDo}</span></p>
                                    <p className="statesTasks-design">Tasks In Progress: <span className="text-info">{totalTasks.tasksInProgress}</span></p>
                                    <p className="statesTasks-design">Completed Tasks: <span className="text-success">{totalTasks.tasksCompleted}</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : actionProp === "createUser" ? (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <CustomInput 
                                    typeProp={"text"}
                                    nameProp={"firstName"}
                                    placeholderProp={"firstName"}
                                    handlerProp={inputNewUserHandler}
                                />
                                <CustomInput 
                                    typeProp={"text"}
                                    nameProp={"lastName"}
                                    placeholderProp={"lastName"}
                                    handlerProp={inputNewUserHandler}
                                />
                                <CustomInput 
                                    typeProp={"email"}
                                    nameProp={"email"}
                                    placeholderProp={"email"}
                                    handlerProp={inputNewUserHandler}
                                />
                            </div>
                        </div>
                    </div>
                ): "Woohoo, you are reading this text in a modal!"}</Modal.Body>
                <Modal.Footer>
                    <Button className='btnCustomModal-design' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {actionProp!=="editGroup" && <Button className='btnCustomModal-design' variant="primary" onClick={() => {
                        saveData()
                        handleClose()
                    }}>
                        Save Changes
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminControlModal;