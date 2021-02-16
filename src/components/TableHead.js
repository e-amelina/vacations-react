import { Component } from 'react';
import Button from './Button';
import { Utils } from '../utils/utils';

export default class TableHead extends Component {

    render() {
        this.month = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { month: "numeric" }), 10);
        this.year = Number.parseInt(this.props.currentDate.toLocaleDateString("en-US", { year: "numeric" }), 10);
        this.countDays = Utils.getDaysInMonth(this.month, this.year);

        const row = [];
        for(let cellNumber = 0; cellNumber < this.props.size; cellNumber++) {
            const date = new Date(this.year, this.month - 1, cellNumber);
            if(!cellNumber) {
                row.push(<th className = " cell cell-button" key = {cellNumber}>
                    <Button value = "&#10011;Add Vacation"/>
                    </th>);
            } else if(cellNumber === this.props.size -1) {
                row.push(<th className = "cell cell-sum" key = {cellNumber}>Sum</th>)
            } else {
                const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
                if (Utils.hiddenDays(cellNumber, this.countDays, this.props.size)) {
                    row.push(<th className = "cell cell-day hidden" key = {cellNumber}> <span className="day">{weekdayName}</span><span className = "date">{cellNumber}</span> </th>);
                } else {
                    if (Utils.isWeekend(weekdayName)) {
                        row.push(<th className = "cell cell-day weekend" key = {cellNumber}> <span className="day">{weekdayName}</span><span className = "date">{cellNumber}</span> </th>);
                    } else {
                        row.push(<th className = "cell cell-day" key = {cellNumber}> <span className="day">{weekdayName}</span><span className = "date">{cellNumber}</span> </th>);
                    }
                }
            }
        }

        return row;
    }
}