import { useState } from "react";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { loginCall } from "../../services/apiCalls";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { login } from "../../app/Slices/userSlice"
import "./Login.css"
import { notify } from "../../components/CustomToast/CustomToast";

export const Login = () => {
    //Login and landing page

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch()

    const inputHandler = (e) => {
        setCredentials((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value
        }));
    }

    const loginMe = async () => {
        try {
            //Function to login...
            const res = await loginCall(credentials);
            if (res.data.token) {
                const uDecoded = decodeToken(res.data.token)

                const passport = {
                    token: res.data.token,
                    decoded: uDecoded
                }

                //Save passport on RDX
                dispatch(login(passport))

            }
        } catch (error) {
            notify(error.response.data.message, 'error')
        }
    }

    return (
        <div className="container-fluid h-100 boxLogin-design">
            <div className="row h-100">
                <div className="col-1"></div>
                <div className="col-10 d-flex justify-content-center align-items-center">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-12 col-lg-6 boxIcon-design">
                                <img className="iconImage-design" src="../../TeamCollaborationHubIcon.png" alt="TeamCollaborationHub-Icon" />
                            </div>
                            <div className="col-12 col-lg-6  d-flex align-items-center justify-content-center">
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <h2>TeamCollaborationHub</h2>
                                    <CustomInput
                                        typeProp={"email"}
                                        nameProp={"email"}
                                        placeholderProp={"Your email..."}
                                        handlerProp={(e) => inputHandler(e)}
                                    />
                                    <CustomInput
                                        typeProp={"password"}
                                        nameProp={"password"}
                                        placeholderProp={"Password"}
                                        handlerProp={(e) => inputHandler(e)}

                                    />
                                    <div className="logOrRegister-box-design d-flex">
                                        <CustomButton
                                            title={"log me!"}
                                            classNameProp={"regularButtonClass"}
                                            functionEmit={loginMe}
                                        />
                                        <RegisterModal
                                            btnProp={false}
                                            titleProp={"You don´t have an account? Register"}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
                <div className="col-1"></div>
            </div>
        </div >
    )
}