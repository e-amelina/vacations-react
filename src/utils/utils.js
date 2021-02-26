export class Utils {
    static isWeekend(date) {
      if (date === "Sun" || date === "Sat") {
        return true;
      }
      return false;
    }
  
    static getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
  
    static hiddenDays(cellNumber, daysInMonth, allCells) {
      if (cellNumber > daysInMonth && cellNumber < allCells) {
        return true;
      }
      return false;
    }
  }
  