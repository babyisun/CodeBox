import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, Link, Redirect,Switch} from 'react-router-dom';
// import {createBrowserHistory} from 'history';
// const history = createBrowserHistory();
import {createHashHistory} from 'history';
const history = createHashHistory();

import Home from '../component/Home.jsx';
import Login from '../component/Login.jsx';

class Page extends React.Component {
    constructor(props) {
        super(props);
        console.log("page once");
    }

    render() {
        console.log("page render once");
        return (<div>
            <div>header</div>
            <div>{this.props.children}</div>
            {/*<div>
             <Redirect to='/index'/>
             <Route exact path="/index" component={Home}/>
             <Route exact path="/login" component={Login}/>
             </div>*/}
            <div>footer</div>
        </div>)
    }
}


ReactDOM.render(<HashRouter history={history}>
        <div>
            <ul>
                <li><Link to="/index">Home</Link></li>
                <li><Link to="/login">login</Link></li>
            </ul>

            <Page>
                <Redirect to='/index'/>
                <Route exact path="/index" component={Home}/>
                <Route exact path="/login" component={Login}/>
            </Page>

        </div>
    </HashRouter>,
    document.getElementById('page')
);
