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

const date = new Date();

let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

let select = "col" + (currWeekDay+1);

const eat = document.getElementById("ate");
const noeat = document.getElementById("noeat");
/*
function breakfastLog {
    
}
*/

//CHANGE TO GREEN IF ATE BREAKFAST


eat.addEventListener("click", breakfastTrue);
function breakfastTrue() {
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
            console.log(user.uid);
            

        } else {
            // No user is signed in.
        }
    });
}