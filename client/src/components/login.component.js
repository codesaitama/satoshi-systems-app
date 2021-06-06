import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {postOrPutRequest, method, accountAuth} from './../tools/utils.js';

export default function Login() {
    const [getUserData, setUserData] = useState({ name: '', password: '' });
    const [passwordShown, setPasswordShown] = useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = useState(accountAuth.isAuthenticated);

    const {state}= useHistory()

    const handleOnChange = (evt) => {
        setUserData(data => ({ ...data, [evt.target.name]: evt.target.value }))
    }

    const togglePasswordVisibility = (evt) => {
        setPasswordShown(!passwordShown)
    }

    const login = () => {
        accountAuth.authenticate(() => {
            setRedirectToReferrer(true);
        })
    }

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();

        let { name, password } = getUserData;

        if (!name || !(name.length > 3)) {
            alert('Name needs to be provided');
            return;
        }

        if (!password || !(password.length > 3)) {
            alert('Password needs to be provided');
            return;
        }

        postOrPutRequest('/api/user/login', method.POST, { name, password }, function(response){
            console.log(response)
            if (typeof response == 'object' && response.hasOwnProperty('token')) {
                login()
            }
            
        });
    }

    if (redirectToReferrer) {
        console.log({state})
        //to={state?.from || '/'}
        return <Redirect to={'/home'} />
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" name="name" required aria-required="true" autoComplete="false" onChange={handleOnChange} className="form-control" placeholder="Enter name" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type={passwordShown ? "text" : "password"} name="password" required aria-required="true" onChange={handleOnChange} className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <label><input type="checkbox" onChange={togglePasswordVisibility} /> <span>Show Password</span></label>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign In</button>

            <p className="forgot-password text-right">
                Don't have an account? <Link className="navbar-brand" to={"/sign-up"}>Sign Up</Link>
            </p>
        </form>
    );
}