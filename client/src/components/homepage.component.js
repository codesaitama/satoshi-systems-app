import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GetRequest, accountAuth } from './../tools/utils.js';
export default function HomePage() {
    const [getUserData, setUserData] = useState({ name: 'Loading', age: 'Loading', score: 'Loading' });
    const [redirectToReferrer, setRedirectToReferrer] = useState(accountAuth.isAuthenticated);
    let { name, age, score } = getUserData;

    React.useEffect(() => {
        GetRequest("/api/user", function (response) {
            setUserData(response)
        });
    }, []);

    const logOut = (evt) => {
        evt.preventDefault();

        GetRequest('/api/user/logout', function (response) {
            accountAuth.signOut(()=> setRedirectToReferrer(false))
        });
    }

    if(!redirectToReferrer){
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
                        <input type="text" name="name" defaultValue={name} className="form-control" readOnly />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input type="text" name="age" defaultValue={age} readOnly className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Score</label>
                        <input type="text" name="score" defaultValue={score} readOnly className="form-control" />
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