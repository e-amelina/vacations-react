import { Component } from 'react';
import { data } from '../api/api';
import { Utils } from '../utils/utils';


export default class TableBody extends Component {
    constructor(props) {
        super(props);
        this.state = data;
    }

    renderCells(rowNumber, teamNumber) {
        const cells = [];

        for(let cellNumber = 0; cellNumber < this.props.size - 1; cellNumber++) {
            const date = new Date(this.year, this.month - 1, cellNumber + 1);
            if(cellNumber === this.props.size - 2) {
                if(!rowNumber || rowNumber === this.state.teams[teamNumber].members.length) {
                    cells.push(<td className = "cell cell-sum" key = {cellNumber}><div className = "border"></div></td>)
                } else {
                    cells.push(<td className = "cell cell-sum" key = {cellNumber}></td>)
                }
            }
            if (Utils.hiddenDays(cellNumber + 1, this.countDays, this.props.size)) {
                if(!rowNumber || rowNumber === this.state.teams[teamNumber].members.length) {
                    cells.push(<td className = "cell hidden" key = {cellNumber}><div className = "border"></div></td>);
                } else {
                    cells.push(<td className = "cell hidden" key = {cellNumber}></td>);
                }
            } else {
                const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
                if (Utils.isWeekend(weekdayName)) {
                    if(!rowNumber || rowNumber === this.state.teams[teamNumber].members.length) {
                        cells.push(<td className = "cell weekend" key = {cellNumber}><div className = "border"></div></td>);
                    } else {
                        cells.push(<td className = "cell weekend" key = {cellNumber}></td>);
                    }
                } else {
                    if(!rowNumber || rowNumber === this.state.teams[teamNumber].members.length) {
                        cells.push(<td className = "cell" key = {cellNumber}><div className = "border"></div></td>); 
                    } else {
                        cells.push(<td className = "cell" key = {cellNumber}></td>); 

                    }
                }
            }
        }

        return cells;
    }

    createTeamInformation(teamNumber) {

        return (
            <td className = "cell team">
                <div className = "border"></div>
                <div className = "team__info">
                    <span className = "team__name">
                        {this.state.teams[teamNumber].name}
                    </span>
                    <span className = "team__count-members">
                    {this.state.teams[teamNumber].members.length}
                    </span>
                    <span className = "team__percentage-absent">{this.state.teams[teamNumber].percentageOfAbsent[this.month]}%</span>
                    <span className = "team__btn--hide" onClick = {(event) => {
                        const hideButton = event.target;
                            
                        const hiddenBlock = hideButton.closest("tr");
                        if (hiddenBlock.classList.contains("close")) {
                        if (hiddenBlock.classList.contains(`${this.state.teams[teamNumber].name.split(" ").join("-")}`)) {
                            const hiddenElements = document.querySelectorAll(`.${this.state.teams[teamNumber].name.split(" ").join("-")}`);
                            hiddenElements.forEach((element) => {
                            if (!element.classList.contains("close")) {
                                element.classList.remove("hidden");
                            }
                            });
                        }
                        hiddenBlock.classList.remove("close");
                        } else {
                        hiddenBlock.classList.add("close");
                        if (hiddenBlock.classList.contains(`${this.state.teams[teamNumber].name.split(" ").join("-")}`)) {
                            const hiddenElements = document.querySelectorAll(`.${this.state.teams[teamNumber].name.split(" ").join("-")}`);

                            hiddenElements.forEach((element) => {
                            if (!element.classList.contains("close")) {
                                element.classList.add("hidden");
                            }
                            });
                        }
                        }
                    }}></span>
                </div>
            </td>
        )

    }

    hideMembers (event, teamNumber) {
            
          
    }

    render() {
        this.month = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
        this.year = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);
        this.countDays = Utils.getDaysInMonth(this.month, this.year);
        const rows = [];

        for(let teamNumber = 0; teamNumber < this.state.teams.length; teamNumber++ ) {
            for(let rowNumber = 0; rowNumber < this.state.teams[teamNumber].members.length + 1; rowNumber++ ) {
               if(!rowNumber) {
                   let className = "department ";
                   className += this.state.teams[teamNumber].name.split(" ").join("-");
                rows.push(<tr key = {teamNumber} className = {className}>
                        {this.createTeamInformation(teamNumber)}
                        {this.renderCells(rowNumber, teamNumber)}
                    </tr>)
               } else if(rowNumber === this.state.teams[teamNumber].members.length) { 
                let className = "last-row ";
                className += this.state.teams[teamNumber].name.split(" ").join("-");
                rows.push(<tr key = {teamNumber} className = {className}>
                    <td key = {rowNumber} className = "cell team">{this.state.teams[teamNumber].members[rowNumber - 1].name}<div className = "border"></div></td>
                    {this.renderCells(rowNumber, teamNumber)}
                </tr>)
               } else {
                rows.push(<tr key = {teamNumber} className = {this.state.teams[teamNumber].name.split(" ").join("-")}>
                    <td key = {rowNumber} className = "cell team">{this.state.teams[teamNumber].members[rowNumber - 1].name}</td>
                    {this.renderCells(rowNumber, teamNumber)}
                </tr>)
               }
            }
        }

        return rows;
    }
}