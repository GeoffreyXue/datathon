import {useEffect, useContext} from 'react';

import LoginContext from './../../LoginContext';

function Home() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    
    useEffect(() => {
        setLoggedIn(false);
    }, []);

    return <div>Home</div> 
}

export default Home;