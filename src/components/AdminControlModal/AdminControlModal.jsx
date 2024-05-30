import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomInput } from '../CustomInput/CustomInput';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/Slices/userSlice';
import { bringOneUserData, updateOneUserData } from '../../services/apiCalls';

function AdminControlModal({ actionProp, dataIdProp,editSuccess }) {
    const [show, setShow] = useState(false);
    const [areYouEditing, setAreYouEditing] = useState(true)
    const [infoData, setInfoData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const user = useSelector(getUserData)
    const token = user.token

    const handleClose = () => {setShow(false) ; setAreYouEditing(true)};
    const handleShow = () => setShow(true);

    const inputHandler = (e) => {
        setInfoData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        if (show) {
            const fetchData = async () => {
                try {
                    if (actionProp === "editUser") {
                        const res = await bringOneUserData(token, dataIdProp)
                        setInfoData({
                            firstName: res.firstName || '',
                            lastName: res.lastName || '',
                            email: res.email || '',
                            password: res.password || ''
                        })

                    } else if (actionProp === "editGroup") {
                        const res = await bringOneGroupData(token, dataIdProp)
                        // setInfoData(res)

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()    
        }
    },[show, actionProp, dataIdProp])

    const saveData = async() => {
        if(actionProp==="editUser"){
            try {

                const res = await updateOneUserData(token,dataIdProp,infoData)
                console.log(res);
                editSuccess()

            } catch (error) {
                console.log(error)
            }
        }
    }

    if(!infoData){
        return <div>Loading...</div>
    }

    return (
        <>
            {actionProp === "editUser" || "editGroup" ? (
                <button className="iconActionsTeacher-design" onClick={() => {
                    handleShow()
                }}><img className='iconInfo-design' src="../../searchIcon.png" width="20px" height="20px" alt="" />
                </button>
            ) : (<Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>)}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='d-flex'>{actionProp === "editUser" ? (
                        <>
                            <h3>User Info</h3>
                            <button className="iconActionsTeacher-design" onClick={() => {
                                setAreYouEditing(!areYouEditing)
                            }}><img src="../../updateIcon.png" width="20px" height="20px" alt="" />
                            </button>
                        </>
                    ) : actionProp === "editGroup" ? ("Group Info") : ""}</Modal.Title>
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
                    <>
                    </>
                ) : "Woohoo, you are reading this text in a modal!"}</Modal.Body>
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
            </Modal>
        </>
    );
}

export default AdminControlModal;