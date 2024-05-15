import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"

function NavigationBar() {
    return (
        <>
            <div className='appBox-design d-flex justify-content-center align-items-center'>
                <img src="../../TeamCollaborationHubIcon.png" width="50px" height="50px" alt="" />
                <h2>TeamCollaborationHub</h2>
            </div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="allActions-design">
                            <Nav className='actions-design'>
                                <Nav.Link href="#home"><img src="../../homeIcon.png" width="20px" height="20px" alt="" /></Nav.Link>
                                <Nav.Link href="#link"><img src="../../groupIcon.png" width="20px" height="20px" alt="" /></Nav.Link>
                                <Nav.Link href="#link"><img src="../../userProfileIcon.png" width="20px" height="20px" alt="" /></Nav.Link>
                            </Nav>
                            <Nav className='actionLogout-design'>
                                <Nav.Link href="#link"><img src="../../logoutIcon.png" width="20px" height="20px" alt="" /></Nav.Link>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;