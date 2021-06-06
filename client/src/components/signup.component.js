import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { postOrPutRequest, method, accountAuth } from './../tools/utils.js';

export default function SignUp() {
    const [getUserData, setUserData] = useState({ name: '', age: 0, score: 0, password: '', confirmpassword: '' });
    const [postStatus, setPostStatus] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnChange = (evt) => {
        setUserData(data => ({ ...data, [evt.target.name]: evt.target.value }))
    }

    const togglePasswordVisibility = (evt) => {
        setPasswordShown(!passwordShown)
    }

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();

        let { name, age, score, password, confirmpassword } = getUserData;

        if (!name || !(name.length > 3)) {
            alert('Name needs to be provided');
            return;
        }

        if (!age || isNaN(age) || Number(age) === 0) {
            alert('Age needs to be provide and more than 0');
            return;
        }

        if (!score || isNaN(score) || Number(score) === 0) {
            alert('Score needs to be provide and more than 0');
            return;
        }

        if (!password || !(password.length > 3)) {
            alert('Password needs to be provided');
            return;
        }

        if (!confirmpassword || !(confirmpassword.length > 3)) {
            alert('Confirm Password needs to be provided');
            return;
        }

        if (!(password === confirmpassword)) {
            alert('Passwords do not match!');
            return;
        }

        score = Number(score);
        age = Number(age);
        setErrorMessage('')

        postOrPutRequest('/api/user/create', method.POST, { name, age, score, password }, function (response) {

            if (typeof response == 'object' && response.hasOwnProperty('status')) {
                setPostStatus(response.message === 'User was created!')
            }

            if (typeof response == 'object' && response.hasOwnProperty('type')) {
                if(response.message.includes('ER_DUP_ENTRY: Duplicate entry')){
                    setErrorMessage('Name already taken')
                }
            }

        });
    }

    if (accountAuth.isAuthenticated) {
        return <Redirect to='/home' />
    }

    // if (!accountAuth.isAuthenticated) {
    //     return <Redirect to='/sign-up' />
    // }

    if (postStatus) {
        return <Redirect to='/sign-in' />
    }


    return (
        <form onSubmit={handleOnSubmit} autoComplete="off">
            <h3>Sign Up</h3>
            <small className='text-danger'>{errorMessage}</small><br />
            <div className="form-group">
                <label>Username</label>
                <input type="text" name="name" required aria-required="true" onChange={handleOnChange} className="form-control" placeholder="Name" />
            </div>

            <div className="form-group">
                <label>age</label>
                <input type="number" name="age" required aria-required="true" min="15" max="200" onChange={handleOnChange} className="form-control" placeholder="Age" />
            </div>

            <div className="form-group">
                <label>Score</label>
                <input type="text" name="score" required aria-required="true" min="1" max="1000000000000000" onChange={handleOnChange} pattern="^\d*(\.\d{0,2})?$" className="form-control" placeholder="Score" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type={passwordShown ? "text" : "password"} name="password" required aria-required="true" onChange={handleOnChange} className="form-control" placeholder="Password" />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type={passwordShown ? "text" : "password"} name="confirmpassword" required aria-required="true" onChange={handleOnChange} className="form-control" placeholder="Confirm password" />
            </div>

            <div className="form-group">
                <label><input type="checkbox" onChange={togglePasswordVisibility} /> <span>Show Password</span></label>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <Link className="navbar-brand" to={"/sign-in"}>Sign In?</Link>
            </p>
        </form>
    );
}