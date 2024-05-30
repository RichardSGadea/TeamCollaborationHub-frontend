import { useEffect, useState } from "react"
import "./Profile.css"
import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import { bringProfile, updateProfile } from "../../services/apiCalls"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { useNavigate } from "react-router-dom"
import CustomModal from "../../components/CustomModal/CustomModal"


export const Profile = () => {

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [changePassword, setChangePassword] = useState({
        yourPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
    })

    const navigate = useNavigate()

    const [msgError, setMsgError] = useState("");
    const [areYouEditingProfileData, setAreYouEditingProfileData] = useState(false);

    //Take userData
    const myPassport = useSelector(getUserData)
    const token = myPassport.token

    const user = useSelector(getUserData)

    const updateUserProfile = async () => {
        try {
            const res = await updateProfile(profileData, token)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const passwordInputHandler = (e) => {
        setChangePassword((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const updatePassword = async (change) => {
        //Function to update password
        try {
            if (change.newPassword !== change.newPasswordRepeat) {
                setMsgError("New password doesn't match")
                return;
            }
            const res = await updateProfile(change, token)
            if (res.data.message === "User profile updated successfully") {
                setMsgError("User profile updated successfully")
                setTimeout(()=>{
                    handleClose()
                },1000)

            }
        } catch (error) {
            setMsgError(error.response.data.message)
        }
    }

    const inputHandler = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleClose = () => {
        //double navigate to force the profile to be reloaded when canceling profile data modification
        //so that it calls the API again and retrieves them
        navigate("/")
        setTimeout(() => {
            navigate("/profile")
        })
    }
    const handleEditConfirm = () => {
        setAreYouEditingProfileData(false)

        handleClose()
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const myProfileData = await bringProfile(token)
            setProfileData(myProfileData)
        }
        fetchProfile()
    }, [])

    return (
        <div className="container-fluid  boxProfile-design">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center">
                            <h1 className="title-update-profile">{`Manage your personal data, ${user.decoded.userRole}`}</h1>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <h3 className="titles-update">Update profile</h3> 
                                    {user.decoded.userRole !== "admin" && <CustomModal 
                                        actionProp={"deactivateAccount"}
                                        userProfileProp={profileData}
                                    />}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 p-0">
                                    <p className="property-update m-0">FirstName:</p>
                                    <CustomInput
                                        errorText={""}
                                        typeProp="text"
                                        nameProp="firstName"
                                        handlerProp={(e) => inputHandler(e)}
                                        placeholderProp="firstName"
                                        value={profileData.firstName}
                                        isDisabled={!areYouEditingProfileData && "disabled"}
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 p-0">
                                    <p className="property-update m-0">LastName:</p>
                                    <CustomInput
                                        errorText={""}
                                        typeProp="text"
                                        nameProp="lastName"
                                        handlerProp={(e) => inputHandler(e)}
                                        placeholderProp="lastName"
                                        value={profileData.lastName || ""}
                                        isDisabled={!areYouEditingProfileData && "disabled"}
                                    />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 p-0">
                                    <p className="property-update m-0">Email:</p>
                                    <CustomInput
                                        errorText={""}
                                        typeProp="email"
                                        nameProp="email"
                                        handlerProp={(e) => inputHandler(e)}
                                        placeholderProp="email"
                                        value={profileData.email}
                                        isDisabled={!areYouEditingProfileData && "disabled"}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <CustomButton
                                        title={areYouEditingProfileData === false ? "Update" : "Cancel"}
                                        classNameProp={"btn-update-profile"}
                                        functionEmit={areYouEditingProfileData === false ? (() => setAreYouEditingProfileData(true)) : (handleEditConfirm)}
                                    />
                                    {areYouEditingProfileData && (
                                        <>
                                            <CustomButton
                                                title={"Save"}
                                                classNameProp={"btn-update-profile"}
                                                functionEmit={() => {
                                                    updateUserProfile()
                                                    handleEditConfirm()
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12  mt-4">
                                    <h3 className="titles-update">Update password</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 p-0">
                                    <CustomInput
                                        typeProp="password"
                                        nameProp="yourPassword"
                                        handlerProp={(e) => passwordInputHandler(e)}
                                        placeholderProp="your password"
                                    />
                                    {changePassword.yourPassword.length > 0 &&
                                        <div className="d-flex flex-column">
                                            <CustomInput
                                                typeProp="password"
                                                nameProp="newPassword"
                                                handlerProp={(e) => passwordInputHandler(e)}
                                                placeholderProp="new password"
                                            />
                                            <CustomInput
                                                typeProp="password"
                                                nameProp="newPasswordRepeat"
                                                handlerProp={(e) => passwordInputHandler(e)}
                                                placeholderProp="write the new password again"
                                            />
                                            <CustomButton
                                                title={"Save"}
                                                classNameProp={"btn-update-profile"}
                                                functionEmit={() => updatePassword(changePassword)}
                                            />
                                            <p className="passwordError">{msgError}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )

}