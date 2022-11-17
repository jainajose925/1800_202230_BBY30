let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let currMon = months[month] + " " + year;

var firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

//GET NUMBER OF DAYS IN A MONTH
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

var end = moment().endOf('date'); // set to 23:59 pm today

var maxDate = getDaysInMonth(year, month);