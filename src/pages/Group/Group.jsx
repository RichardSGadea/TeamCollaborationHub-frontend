import { useParams } from "react-router-dom"
import "./Group.css"
import { useEffect, useState } from "react";
import { bringGroupById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/Slices/userSlice";

export const Group = () => {

    const {groupId} = useParams();
    const [groupData, setGroupData] = useState(null);

    const user = useSelector(getUserData)
    const token = user.token

    useEffect(() => {
        fetchGroupData(groupId)
    }, [groupId])

    const fetchGroupData = async (id) => {
        //Retrieve group data
        try {
            const data = await bringGroupById(token,id)
            setGroupData(data);
            
        } catch (error) {
            console.log(error);
        }
    };

    if (!groupData) {
        return <div>Loading data...</div>;
    }

    return(
        <>
            <h1>Group</h1>
            <div>
                <h2>{groupData.name}</h2>
            </div>
        </>
    )
}