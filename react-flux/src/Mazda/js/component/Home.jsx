import React from 'react';
import {observer,Provider,inject} from 'mobx-react';

@inject("store")
@observer
export default class Home extends React.Component {
    //@observable price = 100;

    constructor(props){
        super(props);
        console.log("loaded once");
        console.log(props);
        //this.price=112;
    }

   
    render() {
        return (<div>
                Home - {this.price} - {this.props.store.name}:{this.props.store.age}
            </div>
        )
    }

    componentDidMount() {
    let person=this.props.store;
        setInterval(() => {
            //this.price++;
            person.age++;
        }, 1000);
    }
}