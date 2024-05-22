import Card from 'react-bootstrap/Card';
import dayjs from "dayjs"

function CustomCard({ titleProp, createProp, deadlineProp,classNameProp }) {


    return (
        <Card style={{ width: '18rem' }} className={classNameProp}>
            <Card.Body>
                <Card.Title>{titleProp}</Card.Title>
                <Card.Text>      
                    Created : {dayjs(createProp).format("DD/MM/YYYY")} <br />
                    Limit Date : {dayjs(deadlineProp).format("DD/MM/YYYY")}   
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;