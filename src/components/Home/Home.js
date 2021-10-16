import {useEffect, useContext} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginContext from './../../LoginContext';

function Home() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    
    useEffect(() => {
        setLoggedIn(false);
    }, []);

    return (
    <div className="Home">
        <Container>
            <Row>
                <h1 className='m-3'>
                    Healthcare Web App
                    <hr/>
                </h1>
            </Row>
            <Row>
                <div>Login pls</div>
            </Row>
        </Container>
    </div>
    );
}

export default Home;