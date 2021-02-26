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
      dataTable: null
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.addVacation = this.addVacation.bind(this);
  }

  fetchCalendar() {
    
    return fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({dataTable: json});
      }).catch(err => console.log(err));
  }
  
  componentDidMount() {
    this.fetchCalendar();
  }
  
  prevMonth() {
    this.setState({currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1)});
  }

  nextMonth() {
    this.setState({currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1)});
  }

  addVacation(event, teamNumber, userNumber, vacation) {
    if(vacation) {
      data.teams[teamNumber - 1].members[userNumber - 1].vacations.push(vacation);
      this.fetchCalendar();
      hideModal(event);
    }
  }

  render() {
    
    return (
      <div className="App">
        {(this.state.dataTable) &&
        <>
        <Navigation currentDate = {this.state.currentDate} prevMonth = {this.prevMonth} nextMonth = {this.nextMonth}/>
        <Table currentDate = {this.state.currentDate} dataTable = {this.state.dataTable}/>
        <Modal currentDate = {this.state.currentDate} addVacation = {this.addVacation} dataTable = {this.state.dataTable}/>
        </>}
      </div>
    );
  }
}
