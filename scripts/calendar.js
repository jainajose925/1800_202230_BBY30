const date = new Date();

const months = ["January", "Febuary", "March",
"April", "May", "June", "July", "August",
"September", "October", "November", "December"];

const week = ["Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday"];

let day = date.getDay()
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let currMon = months[month] + " " + year;

console.log(week[day]);
console.log(dayNum);
console.log(months[month]);
console.log(year);

document.getElementById("currentMonth").innerHTML = currMon;