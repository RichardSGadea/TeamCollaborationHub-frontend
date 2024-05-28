import { useParams } from "react-router-dom"
import "./Admin.css"
import { useEffect } from "react"
import { getAllGroups, getAllUsers } from "../../services/apiCalls"
import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"

export const Admin = () => {

    const {infoId} = useParams()

    const user = useSelector(getUserData)
    const token = user.token


    useEffect(() =>{

        const fetchData = async() => {
            if(infoId==="1"){
                const res = await getAllUsers(token)
            }else{
                const res = await getAllGroups(token)
            }
        }
        fetchData()
        
    },[])

    return (
        <>


        </>
    )

}