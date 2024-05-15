import Button from 'react-bootstrap/Button';
import "./RegisterModal.css"
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { CustomInput } from '../CustomInput/CustomInput';
import { registerCall } from '../../services/apiCalls';

function MyVerticallyCenteredModal({ onRegisterSuccess, show, onHide }) {
    const [newUser, setNewUser] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("")
    const [msg, setMsg] = useState("")

    const inputHandler = (e) => {
        setNewUser((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    const resetInputHandler = () => {
        setNewUser({
            firstName: "",
            email: "",
            password: "",
        })
    }

    const registerMe = async () => {
        try {
            //Function to register....
            const res = await registerCall(newUser);
            if (res.status === 201) {
                setMsg(res.data.message)
                setTimeout(() => {
                    setMsg("")
                    resetInputHandler()
                    onHide()
                    //Notify parent component about successful registration
                    onRegisterSuccess();
                }, 2000)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        console.log(newUser);
    },[newUser])

    return (
        <Modal
            show={show}
            onHide={() => {
                resetInputHandler();
                onHide();
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title>
                <button type="button" className="btn-close" onClick={() => {
                    resetInputHandler()
                    onHide()
                }} aria-label="Close"></button>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
                {
                    msg === "" ? (
                        <>
                            <CustomInput
                                typeProp={"text"}
                                nameProp={"firstName"}
                                placeholderProp={"FirstName"}
                                handlerProp={(e) => inputHandler(e)}
                            />
                            <CustomInput
                                typeProp={"email"}
                                nameProp={"email"}
                                placeholderProp={"Email"}
                                handlerProp={(e) => inputHandler(e)}
                            />
                            <CustomInput
                                typeProp={"password"}
                                nameProp={"password"}
                                placeholderProp={"Password"}
                                handlerProp={(e) => inputHandler(e)}

                            />
                        </>
                    ) : (
                        <h3>{msg}</h3>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    msg === "" &&
                        <>
                            <Button className='btnRegister' onClick={() => {
                                resetInputHandler()
                                onHide()
                            }}>Close</Button>
                            <Button className='btnRegister' onClick={() => registerMe()}>Save</Button>
                        </>
                    
                }
            </Modal.Footer>
        </Modal>
    );
}

function RegisterModal({ titleProp, btnProp }) {
    const [modalShow, setModalShow] = useState(false);
    const [registered, setRegistered] = useState(false);

    const handleRegisterSuccess = () => {
        setRegistered(true);
        
    }

    return (
        <>
            {btnProp === false ?
                (<a className="registerBtn-design p-2 link-white" onClick={() => setModalShow(true)} >{titleProp}</a>) :
                (<Button variant="primary" onClick={() => setModalShow(true)}>
                    {titleProp}
                </Button>)
            }
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onRegisterSuccess={handleRegisterSuccess}
            />
        </>
    );
}

export default RegisterModal;