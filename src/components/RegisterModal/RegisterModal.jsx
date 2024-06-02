import Button from 'react-bootstrap/Button';
import "./RegisterModal.css"
import Modal from 'react-bootstrap/Modal';
import {useState } from 'react';
import { CustomInput } from '../CustomInput/CustomInput';
import { registerCall } from '../../services/apiCalls';
import { notify } from '../CustomToast/CustomToast';

function MyVerticallyCenteredModal({ onRegisterSuccess, show, onHide }) {

    // Define state for new user
    const [newUser, setNewUser] = useState({
        firstName: "",
        email: "",
        password: "",
    });
    

    const [msg, setMsg] = useState("") // Define state for message

    // Function to handle input change
    const inputHandler = (e) => {
        setNewUser((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

     // Function to reset input fields
    const resetInputHandler = () => {
        setNewUser({
            firstName: "",
            email: "",
            password: "",
        })
    }

    // Function to register user
    const registerMe = async () => {
        try {
            // Call registerCall function
            const res = await registerCall(newUser);
            if (res.status === 201) {
                setMsg(res.data.message)// Set message
                setTimeout(() => {
                    setMsg("")
                    resetInputHandler()
                    onHide()
                    onRegisterSuccess(); // Notify parent component about successful registration
                }, 2000)
            }

        } catch (error) {
            notify(error.response.data.message, 'error') // Notify error
        }
    }

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
    const [modalShow, setModalShow] = useState(false); // Define state for modal
    const [registered, setRegistered] = useState(false); // Define state for registered status

    // Function to handle register success
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