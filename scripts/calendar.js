const date = new Date();

const months = ["January", "Febuary", "March",
"April", "May", "June", "July", "August",
"September", "October", "November", "December"];

const week = ["Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday"];

let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let currMon = months[month] + " " + year;

let firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

let select = "w" + (parseInt((dayNum/7)+1)) + "d" + (currWeekDay + 1);

document.getElementById(select).style.backgroundColor = "black";
document.getElementById("currentMonth").innerHTML = currMon;