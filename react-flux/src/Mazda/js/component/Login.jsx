import React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }


    render() {
        return (
            <div className="login-container">
               Login
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}