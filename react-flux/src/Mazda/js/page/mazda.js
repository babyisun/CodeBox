import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter,Route, Link} from 'react-router-dom';
// import {createBrowserHistory} from 'history';
// const history = createBrowserHistory();
import {createHashHistory} from 'history';
const history = createHashHistory();

import Home from '../component/Home.jsx';
import Login from '../component/Login.jsx';

/*class Home extends React.Component {
    render() {
        return (<div>home
        </div>)
    }
}
class Login extends React.Component {
    render() {
        return (<div>Login
        </div>)
    }
}*/


ReactDOM.render(<HashRouter history={history}>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">login</Link></li>
            </ul>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
        </div>
    </HashRouter>,
    document.getElementById('page')
);
