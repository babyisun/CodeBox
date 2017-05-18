import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, Link, Redirect,Switch} from 'react-router-dom';
// import {createBrowserHistory} from 'history';
// const history = createBrowserHistory();
import {createHashHistory} from 'history';
const history = createHashHistory();

import {observable} from 'mobx';
import {observer,Provider,inject} from 'mobx-react';

import Home from '../component/Home.jsx';
import Login from '../component/Login.jsx';

const person = observable({name:"aaa",age:21});

//@inject("store")
//@observer
class Page extends React.Component {
     //@observable nums=110;

    constructor(props) {
        super(props);
         //console.log(props.store);
        //console.log(this.nums+"a21");
    }

    render() {
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


ReactDOM.render(<Provider store={person}>
    <HashRouter history={history}>
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
    </HashRouter></Provider>,
    document.getElementById('page')
);
