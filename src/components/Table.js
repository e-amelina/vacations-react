import React, { Component } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';


export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTable : this.props.dataTable,
            size: 33
        }
    }

    render() {
        return (
            <table>
                <thead>
                    <TableHead size = {this.state.size} currentDate = {this.props.currentDate}/>
                </thead>
                <tbody>
                    <TableBody size = {this.state.size} currentDate = {this.props.currentDate}/>
               </tbody>
            </table>
         )
    }
}