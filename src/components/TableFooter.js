import { Component } from "react";
import  { Utils } from "../utils/utils";


export default class TableFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: this.props.dataTable,
        }
    }

    countUsers() {
        let countUsers = 0;
        this.props.dataTable.teams.forEach(team => {
            countUsers += team.members.length;
        });

        return countUsers;
    }

    render() {
        this.month = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
        this.year = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);
        this.countDays = Utils.getDaysInMonth(this.month, this.year);

        return(
            <>
                <tr className = "last-row">
                    <td className = "cell team vacation"> <div className = "border-top border-bottom"></div>Day-Person Stats</td>
                    {this.props.peopleCountVacationsByDay.map((day, index, arr) => {
                        let className = "cell vacation ";
                        const date = new Date(this.year, this.month - 1, index + 1);
                        const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });

                        if (Utils.hiddenDays(index + 1, this.countDays, this.props.size)) {
                            className += "hidden ";
                            
                        } else {
                            if (Utils.isWeekend(weekdayName)) {
                                className += "weekend ";      
                            } 
                        }  
                        return(<td className = {className} key = {`vacations-cell${index}`}>
                                <div className = "border-top border-bottom"></div>
                                    {!(Utils.isWeekend(weekdayName)) && arr[index + 1]}
                                </td>);              
                    })}
                </tr>

                <div>
                    <h4 className="summary">{this.props.currentDate.toLocaleDateString("en-US", {month: "long" } )} teams Summary</h4>
                    <p>On vacation <span className = "vacations-people">{this.props.vacationPeople}</span> <span className = "vacations-people-percentage">{Math.floor(100 * this.props.vacationPeople / this.countUsers())}%</span></p>
                </div>
            </>
        )
    }
}