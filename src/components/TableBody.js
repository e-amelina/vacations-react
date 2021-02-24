import { Component } from 'react';
import { data } from '../api/api';
import { Utils } from '../utils/utils';


export default class TableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTeams : data,
        }

        this.daysOff = new Array(this.state.dataTeams.teams.length);

    }

    getPaidDays(vacations) {
        const paidDays = [];
        vacations.forEach((vacation) => {
          paidDays.push({
            startDay: Number.parseInt(vacation.startDate.split(".")[0], 10),
            month: Number.parseInt(vacation.startDate.split(".")[1], 10),
            endDay: Number.parseInt(vacation.endDate.split(".")[0], 10),
            type: vacation.type,
          });
        });
    
        return paidDays;
    }

    renderCells(rowNumber, teamNumber) {
        const cells = [];
        let paidDays = [];

        if(rowNumber) {
            paidDays = this.getPaidDays(this.state.dataTeams.teams[teamNumber].members[rowNumber - 1].vacations);
        } else {
            this.daysOff[teamNumber] = [];
        }

        for(let cellNumber = 0; cellNumber < this.props.size - 1; cellNumber++) {
            const date = new Date(this.year, this.month - 1, cellNumber + 1);

            let className = "cell ";

            if(cellNumber === this.props.size - 2) {
                className += "cell-sum ";
                cells.push(<td className = {className} key = {`team${teamNumber}-lastCell`}>
                    {(!rowNumber) && <div className = "border-top border-bottom"></div>}
                    {(rowNumber === this.state.dataTeams.teams[teamNumber].members.length) && <div className = "border-bottom"></div>}
                    {(rowNumber) ? (this.daysOff[teamNumber][rowNumber]) ? this.daysOff[teamNumber][rowNumber] : "0" : "" }
                    </td>);
            }
            if (Utils.hiddenDays(cellNumber + 1, this.countDays, this.props.size)) {
                className += "hidden "
                cells.push(<td className = {className} key = {`team${teamNumber}-cell${cellNumber}`}>
                    {(!rowNumber) && <div className = "border-top border-bottom"></div>}
                    {(rowNumber === this.state.dataTeams.teams[teamNumber].members.length) && <div className = "border-bottom"></div>}
                    {this.addPaidDays(cellNumber, paidDays, rowNumber, teamNumber)}
                    </td>);
            } else {
                const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
                if (Utils.isWeekend(weekdayName)) {
                    className+= "weekend "
                    cells.push(<td className = {className} key = {`team${teamNumber}-cell${cellNumber}`}>
                        {(!rowNumber) && <div className = "border-top border-bottom"></div>}
                        {(rowNumber === this.state.dataTeams.teams[teamNumber].members.length) && <div className = "border-bottom"></div>}
                        {this.addPaidDays(cellNumber, paidDays, rowNumber, teamNumber)}
                        </td>);               
                } else {
                    cells.push(<td className = {className} key = {`team${teamNumber}-cell${cellNumber}`}>
                        {(!rowNumber) && <div className = "border-top border-bottom"></div>}
                        {( rowNumber === this.state.dataTeams.teams[teamNumber].members.length) && <div className = "border-bottom"></div>}
                        {this.addPaidDays(cellNumber, paidDays, rowNumber, teamNumber)}
                        </td>); 
                }
            }
        }

        return cells;
    }

    addPaidDays(cellNumber, paidDays, rowNumber, teamNumber) {

        let element = "";
        
        paidDays.forEach((day) => {
            if (day.month === this.month) {
                if (cellNumber + 1 === day.startDay) {

                    const vacation = day.endDay + 1 - day.startDay; 
                    
                    this.daysOff[teamNumber][rowNumber] = vacation;

                    element = <div className = {day.type === "Paid" ? "paid-day" : "unpaid-day"} style = {{
                            width: `${vacation * 27 + vacation - 2}px`,
                            position: 'absolute'
                        }}>Pd</div>
                    
                }    
            }
        });

        return element;
    }

    createTeamInformation(teamNumber) {
        return (
            <td className = "cell team" key = {`team${teamNumber}-cell0`}>
                <div className = "border-top border-bottom"></div>
                <div className = "team__info">
                    <span className = "team__name">
                        {this.state.dataTeams.teams[teamNumber].name}
                    </span>
                    <span className = "team__count-members">
                    {this.state.dataTeams.teams[teamNumber].members.length}
                    </span>
                    <span className = "team__percentage-absent">{this.state.dataTeams.teams[teamNumber].percentageOfAbsent[this.month]}%</span>
                    <span className = "team__btn--hide" onClick = {(event) => this.hideMembers(event, teamNumber)}></span>
                </div>
            </td>
        )
    }

    hideMembers (event, teamNumber) {
        const hideButton = event.target;
        const className = this.state.dataTeams.teams[teamNumber].name.split(" ").join("-");
                            
        const hiddenBlock = hideButton.closest("tr");
        if (hiddenBlock.classList.contains("close")) {
            if (hiddenBlock.classList.contains(className)) {
                const hiddenElements = document.querySelectorAll(`.${className}`);
                hiddenElements.forEach((element) => {
                    if (!element.classList.contains("close")) {
                        element.classList.remove("hidden");
                    }
                });
            }
        hiddenBlock.classList.remove("close");
        } else {
            hiddenBlock.classList.add("close");
            if (hiddenBlock.classList.contains(className)) {
                const hiddenElements = document.querySelectorAll(`.${className}`);

                hiddenElements.forEach((element) => {
                    if (!element.classList.contains("close")) {
                        element.classList.add("hidden");
                    }
                });
            }
        }
    }

    render() {
        this.month = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
        this.year = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);
        this.countDays = Utils.getDaysInMonth(this.month, this.year);
        const rows = [];

        for(let teamNumber = 0; teamNumber < this.state.dataTeams.teams.length; teamNumber++ ) {
            for(let rowNumber = 0; rowNumber < this.state.dataTeams.teams[teamNumber].members.length + 1; rowNumber++ ) {
               if(!rowNumber) {
                    let className = "department ";
                    className += this.state.dataTeams.teams[teamNumber].name.split(" ").join("-");
                    rows.push(<tr className = {className} key = {`row${rowNumber}-team${teamNumber}`}>
                        {this.createTeamInformation(teamNumber)}
                        {this.renderCells(rowNumber, teamNumber)}
                    </tr>)
               } else if(rowNumber === this.state.dataTeams.teams[teamNumber].members.length) { 
                let className = "last-row ";
                className += this.state.dataTeams.teams[teamNumber].name.split(" ").join("-");
                rows.push(<tr className = {className} key = {`row${rowNumber}-team${teamNumber}`}>
                    <td className = "cell team" key = {`team${teamNumber}-cell0`}>
                        {this.state.dataTeams.teams[teamNumber].members[rowNumber - 1].name}
                        {(!rowNumber) && <div className = "border-top"></div>}
                        {(rowNumber === this.state.dataTeams.teams[teamNumber].members.length) && <div className = "border-bottom"></div>}
                        </td>
                    {this.renderCells(rowNumber, teamNumber)}
                </tr>)
               } else {
                rows.push(<tr className = {this.state.dataTeams.teams[teamNumber].name.split(" ").join("-")} key = {`row${rowNumber}-team${teamNumber}`}>
                    <td className = "cell team" key = {`team${teamNumber}-cell0`}>{this.state.dataTeams.teams[teamNumber].members[rowNumber - 1].name}</td>
                    {this.renderCells(rowNumber, teamNumber)}
                </tr>)
               }
            }
        }

        return rows;
    }
}