const date = new Date();

const week = ["Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday"];

let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

let select = "col" + (currWeekDay+1);

//CHANGE TO GREEN IF ATE BREAKFAST
const eat = document.getElementById("ate");

eat.addEventListener("click", breakfastTrue);

function breakfastTrue() {
    document.getElementById(select).style.backgroundColor = "#7ffaa0";
}

//CHANGE TO RED IF DIDN'T EAT BREAKFAST
const noeat = document.getElementById("noeat");

noeat.addEventListener("click", breakfastFalse);

function breakfastFalse() {
    document.getElementById(select).style.backgroundColor = "#f78691";
}