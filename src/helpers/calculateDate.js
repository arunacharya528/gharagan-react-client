export const calculateDate = (date1, date2) => {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    // var message = date2.toDateString();
    // message += " was "
    var message = ''

    message += years > 0 ? years + " years " : ''
    message += months > 0 ? months + " months " : ''
    message += days > 0 ? days + " days " : ''

    console.log(days, months, years)

    return message
}
