import React, { Component } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableFooter from './TableFooter';


export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTable : this.props.dataTable,
            size: 33,
            vacationPeople: 0,
        }

        this.addVacationsByDay = this.addVacationsByDay.bind(this);
        this.initVacationsByDay = this.initVacationsByDay.bind(this);
        this.addVacationsPeople = this.addVacationsPeople.bind(this);

        this.peopleCountVacationsByDay = new Array(this.state.size);

    }

    addVacationsByDay(index) {
        this.peopleCountVacationsByDay[index] ? this.peopleCountVacationsByDay[index] += 1 : this.peopleCountVacationsByDay[index] = 1;
    }

    initVacationsByDay() {
        this.peopleCountVacationsByDay.fill(0);
    }

    addVacationsPeople(data) {
        this.setState({vacationPeople: data})
    }

    render() {

        return (
            <table>
                <thead>
                    <TableHead size = {this.state.size} currentDate = {this.props.currentDate}/>
                </thead>
                <tbody>
                    <TableBody dataTable = {this.props.dataTable} size = {this.state.size} addVacationsPeople = {this.addVacationsPeople} initVacationsByDay = {this.initVacationsByDay} addVacationsByDay = {this.addVacationsByDay} currentDate = {this.props.currentDate}/>
               </tbody>
               <tfoot>
                   <TableFooter dataTable = {this.props.dataTable} size = {this.state.size} peopleCountVacationsByDay = {this.peopleCountVacationsByDay} currentDate = {this.props.currentDate} vacationPeople = {this.state.vacationPeople}/>
               </tfoot>
            </table>
         )
    }
}