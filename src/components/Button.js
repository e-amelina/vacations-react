import { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <button>{this.props.value}</button>
        )
    }
}