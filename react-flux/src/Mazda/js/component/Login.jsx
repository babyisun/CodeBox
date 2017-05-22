import React from 'react';
import {Link} from 'react-router-dom';
import {observer,inject} from 'mobx-react';

@inject("store")
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }


    render() {
        return (
            <div className="login-container">
               Price: {this.props.store.total}
               <button onClick={()=>this.props.store.addItem()}>Add a Item</button>
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}