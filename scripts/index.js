const date = new Date();

const week = ["Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday"];

let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

console.log(week[currWeekDay]);

let select = "col" + (currWeekDay+1);

console.log(select);

document.getElementById(select).style.backgroundColor = "black";

