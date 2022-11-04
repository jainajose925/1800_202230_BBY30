function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;

            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertName();


//GET DATE
const date = new Date();

let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

let select = "col" + (currWeekDay+1);

const months = ["january", "febuary", "march",
"april", "may", "june", "july", "august",
"september", "october", "november", "december"];

let currentDate = months[month] + "" + dayNum + "_" + year;
console.log(currentDate);


//LOG BREAKFAST
const eat = document.getElementById("ate");
const noeat = document.getElementById("noeat");



/*
function breakfastLog {
    
}
*/

//CHANGE TO GREEN IF ATE BREAKFAST
eat.addEventListener("click", breakfastTrue(currentDate));

function breakfastTrue(today) {
    var dateRef = db.collection("history");
    document.getElementById(select).style.backgroundColor = "#7ffaa0";
}

//CHANGE TO RED IF DIDN'T EAT BREAKFAST
noeat.addEventListener("click", breakfastFalse);

function breakfastFalse() {
    document.getElementById(select).style.backgroundColor = "#f78691";
}

function getUserID() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            let id = user.uid;
            return id;

        } else {
            // No user is signed in.
        }
    });
}
