import Card from 'react-bootstrap/Card';
import dayjs from "dayjs"
import "./CustomCard.css"
import { useLocation } from 'react-router-dom';
import CustomModal from '../CustomModal/CustomModal';

function CustomCard({ titleProp, groupNumber, createProp, deadlineProp, classNameProp, taskNumber,onEditSuccess  }) {

    // Get the current location
    const location = useLocation()
    const path = location.pathname
    
    return (
        <Card style={{ width: '18rem' }} className={`card-design ${classNameProp}`}>
            <Card.Body>
                {/* Render card title */}
                <Card.Title className='d-flex justify-content-between'>
                    {titleProp}
                    {/* Render CustomModal component for editing tasks if the path matches */}
                    {path === `/group/${groupNumber}/tasks` &&
                        <CustomModal
                            actionProp={"editTask"}
                            groupIdProp={groupNumber}
                            taskIdProp={taskNumber}
                            editSuccess={onEditSuccess}
                        />
                    }
                </Card.Title>
                <Card.Text>
                    {/* Render card text with task creation and deadline dates */}
                    Created : {dayjs(createProp).format("DD/MM/YYYY")} <br />
                    Limit Date : {dayjs(deadlineProp).format("DD/MM/YYYY")}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;