import './styles/index.scss';
import { Navigation } from './components/Navigation';
import Table from './components/Table';
import Modal, { hideModal } from './components/Modal';
import { Component } from 'react';
import { data } from './api/api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      dataTable: data,
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.addVacation = this.addVacation.bind(this);
  }
  

  prevMonth() {
    this.setState({currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1)});
  }

  nextMonth() {
    this.setState({currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1)});
  }

  addVacation(event, teamNumber, userNumber, vacation) {
    if(vacation) {
      data.teams[teamNumber - 1].members[userNumber - 1].vacations.push(vacation)
      this.setState({dataTable: data});
      hideModal(event);
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation currentDate = {this.state.currentDate} prevMonth = {this.prevMonth} nextMonth = {this.nextMonth}/>
        <Table currentDate = {this.state.currentDate} dataTable = {this.state.dataTable}/>
        <Modal currentDate = {this.state.currentDate} addVacation = {this.addVacation} dataTable = {this.state.dataTable}/>
      </div>
    );
  }
}
