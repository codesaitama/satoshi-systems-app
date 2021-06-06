import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { GetRequest, accountAuth } from './../tools/utils.js';


export default function HomePage() {
    const [getUserData, setUserData] = useState({ name: 'Loading', age: 'Loading', score: 'Loading' });
    const [redirectToReferrer, setRedirectToReferrer] = useState(accountAuth.isAuthenticated);
    const history = useHistory();

    React.useEffect(() => {
        GetRequest("/api/user", function (response) {
            if(response){
                setUserData(data => ({ ...data, name: response.name, age: response.age, score: response.score }))
            }
            
        });
    }, []);

    const logOut = (evt) => {
        evt.preventDefault();

        GetRequest('/api/user/logout', function (response) {
            accountAuth.signOut(() => {
                setRedirectToReferrer(false);
                history.push('/')
            })
        });
    }

    const handleChange = (evt) => {
        setUserData(data => ({ ...data, [evt.target.name]: evt.target.value }))
    }

    if (!redirectToReferrer) {
        return <Redirect to={'/sign-in'} />
    }

    return (
        <form >
            <h3>User Info</h3>

            {getUserData
                ?
                <>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="name" value={getUserData.name} onChange={handleChange} className="form-control" readOnly />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input type="text" name="age" value={getUserData.age} onChange={handleChange} readOnly className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Score</label>
                        <input type="text" name="score" value={getUserData.score} onChange={handleChange} readOnly className="form-control" />
                    </div>

                    <p className="forgot-password text-right">
                        <Link className="navbar-brand" to={''} onClick={logOut}>Sign Out</Link>
                    </p>
                </>
                :
                <div>Loading...</div>}


        </form>
    );
}