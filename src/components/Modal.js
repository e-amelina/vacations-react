import { Component } from "react";
import PropTypes from "prop-types";

const Teams = ({dataTable}) => {
  return (
    dataTable.teams.map((team) => {
      return <option value = {team.id}>{team.name}</option>;
    })
  )
} 

const Users = ({team}) => {
  return (
    team.members.map((member) => {
      return <option value = {member.id}>{member.name}</option>
    })
  )
}


export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDay: 1,
      endDay: 1,
    }
  }

  getTeam() {
    const teamF = this.props.dataTable.teams.find(team => team.id === Number.parseInt(this.state.selectedTeam, 10));
    return teamF;
  }

  validateDate(value) {
    const [year, , ] = value.split("-");
    const yearLength = year.split("").length;

   if(yearLength > 4) {
      return false;
    }

    return true;
   
  }

  getVacation(e) {
    e.preventDefault();
    if(!this.state.dateStart || !this.state.dateEnd || !this.state.type || !this.state.selectedUser) {
      const button = e.target;
      button.classList.add("error");
      setTimeout(() => {
        button.classList.remove("error");
      }, 1500, button);
      return;
    }
    return {
      startDate: this.state.dateStart.split("-").reverse().join("."),
      endDate: this.state.dateEnd.split("-").reverse().join("."),
      type: this.state.type,
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__dialog slide-in-modal">
          <form className="vacation-form">
            <div className="vacation-form__header">
              <h4 className="vacation-form__title">Vacation Request</h4>
              <p className="vacation-form__days">{this.state.endDay + 1 - this.state.startDay} Days</p>
            </div>
            <div className="vacation-form__content">
              <div className="vacation-form__row">
                <p className="vacation-form__subtitle">Dates</p>
                <div className="vacation-form__dates">
                  <div className="vacation-form__date">
                    <p className="vacation-form__date-text">From</p>
                    <input type="date" onBlur = {(e) => 
                      {
                        this.setState({dateStart : e.target.value});
                        const field = e.target;
                        if(!e.target.value || !this.validateDate(e.target.value) || (new Date(e.target.value) > new Date(this.state.dateEnd))) {
                          
                          field.classList.add("error");
                          field.focus();
                        } else {
                          field.classList.remove("error");
                        }
                      }}/>

                  </div>
                  <div className="vacation-form__date">
                    <p className="vacation-form__date-text">To</p>
                    <input type="date" onBlur = {(e) => 
                      {
                        this.setState({dateEnd : e.target.value});
                        const field = e.target;
                        if(!e.target.value || !this.validateDate(e.target.value) || (new Date(this.state.dateStart) > new Date(e.target.value))) {
                          
                          field.classList.add("error");
                          field.focus();
                        } else {
                          field.classList.remove("error");
                        }
                      }}/>
                  </div>
                </div>
              </div>
              <div className="vacation-form__row">
                <p className="vacation-form__subtitle">Team</p>
                <select className="vacation-form__select" onChange = {(e) => {this.setState({selectedTeam : e.target.value})}}>
                  <option value = "" disabled hidden>Team name</option>
                  <Teams dataTable = {this.props.dataTable}/>
                </select>
              </div>
              <div className="vacation-form__row">
                <p className="vacation-form__subtitle">User</p>
                <select className="vacation-form__select" onChange = {(e) => {this.setState({selectedUser : e.target.value})}}>
                {(!this.state.selectedTeam) && <option value="" selected>User name</option>}
                  {(this.state.selectedTeam) && <Users team = {this.getTeam()}/>}
                </select>
              </div>
              <div className="vacation-form__row">
                <p className="vacation-form__subtitle">Vac Type</p>
                <select className="vacation-form__select" onChange = {(e) => {this.setState({type : e.target.value})}}>
                  <option value = "" disabled hidden>Type</option>
                  <option value = "Paid">Paid Day Off (PD)</option>
                  <option value = "UnPaid">Unpaid Day Off (UPD)</option>
                </select>
              </div>
              <div className="vacation-form__footer">
                <button className="vacation-form__btn vacation-form__cancel close_modal" onClick={hideModal}>
                  Cancel
                </button>
                <button className="vacation-form__btn vacation-form__send close_modal" onClick={(e) => {this.props.addVacation(e, this.state.selectedTeam, this.state.selectedUser, this.getVacation(e))}}>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    );
      
  }

}

export function showModal(e) {
  document.querySelector('.modal__dialog').classList.remove("bounceOutDown");
  document.querySelector('.modal').classList.add("modal-active");
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => input.classList.remove("error"));
  document.body.classList.add("no-scroll");
}

export function hideModal(e) {
  e.preventDefault();
  e.target.closest("form").reset();
  document.querySelector('.modal__dialog').classList.add("bounceOutDown");
  setTimeout(() => {
    document.querySelector('.modal').classList.remove("modal-active");
    document.body.classList.remove("no-scroll");
  }, 500);
}


Modal.propTypes = {
  currentDate: PropTypes.object.isRequired,
  addVacation: PropTypes.func.isRequired,
  dataTable: PropTypes.shape({
    teams: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name:PropTypes.string,
            percentageOfAbsent: PropTypes.arrayOf(PropTypes.number),
            members: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                name:PropTypes.string,
                vacation: PropTypes.arrayOf(PropTypes.shape({
                    startDate: PropTypes.string,
                    endDate: PropTypes.string,
                    type: PropTypes.string
                }))
            }))
        })
    )
}).isRequired
}