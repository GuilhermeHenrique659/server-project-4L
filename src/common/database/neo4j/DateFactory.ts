import { DateTime } from "neo4j-driver";

class DateFactory {
    static getNewDate(date: Date) {
        return new DateTime(
            date.getFullYear(),
            date.getMonth(),
            date.getDay(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds(),
            date.getTimezoneOffset())
    }
}

export default DateFactory;