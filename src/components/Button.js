import { Component } from 'react';
import { showModal } from "../components/Modal";

export default class Button extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <button onClick={showModal}>{this.props.value}</button>
        )
    }
}