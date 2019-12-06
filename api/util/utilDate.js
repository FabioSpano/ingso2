
class UtilDate {
    static isValidDate(dateString)
    {
        var vectorDate = dateString.split('/');

        var day = parseInt(vectorDate[0], 10);
        var month = parseInt(vectorDate[1], 10);
        var year = parseInt(vectorDate[2], 10);

        if(year < 1000 || year > 3000)
            return false;

        if(month < 1 || month > 12)
            return false;

        var monthsVector = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return day>0 && day<monthsVector[month-1];
    }

    static isBefore(dateString)
    {
        var todaydate = new Date();
        var vectorDate = dateString.split('/');

        var day = parseInt(vectorDate[0], 10);
        var month = parseInt(vectorDate[1], 10);
        var year = parseInt(vectorDate[2], 10);

        if(year < todaydate.getFullYear())
            return true;
        
        if(month < todaydate.getMonth() && year == todaydate.getFullYear())
            return true;

        if(day <= todaydate.getDate() && month == todaydate.getMonth() && year == todaydate.getFullYear())
            return true;
        
        return false;
    }
}

module.exports = UtilDate;