import React from 'react';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        console.log("loaded once");
    }
   
    render() {
        console.log("render once");
        return (<div>
                Homeqqqqq
            </div>
        )
    }
}