import './styles/index.scss';
import Navigation from "./Navigation/Navigation";
import Table from './components/Table';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    }

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }
  

  prevMonth() {
    this.setState({currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, 1)});
  }

  nextMonth() {
    this.setState({currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 1)});
  }


  render() {
    return (
      <div className="App">
        <Navigation currentDate = {this.state.currentDate} prevMonth = {this.prevMonth} nextMonth = {this.nextMonth}/>
        <Table currentDate = {this.state.currentDate}/>
      </div>
    );
  }
}
