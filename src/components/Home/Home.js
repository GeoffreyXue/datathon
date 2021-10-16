import {useEffect, useContext} from 'react';

import Spinner from 'react-bootstrap/Spinner';

import LoginContext from './../../LoginContext';

import './Home.css';

function Home() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    
    function checkSession() {
        fetch("http://localhost:5000/checksession", {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.log("Auto-redirecting...")
                setLoggedIn(true);
                window.location.href = "http://localhost:3000/datathon/#/patients";
            }
            else {
                console.log("No session found");
                window.location.href = "http://localhost:3000/datathon/#/login";
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        setLoggedIn(false);
        checkSession();
    }, []);


    return (
    <div className="Home">
        <Spinner animation="border" />
    </div>
    );
}

export default Home;