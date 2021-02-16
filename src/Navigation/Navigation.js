import { Component } from "react";


export default class Navigation extends Component {

    render() {
        return (
            <div className="calendarBar">
                <div className="btn prev-btn" onClick={this.props.prevMonth}></div>
                <span className="display-date">{this.props.currentDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                })}</span>
                <div className="btn next-btn" onClick={this.props.nextMonth}></div>
            </div>
        )
    }

}