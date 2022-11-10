//INSERT NAME
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
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

//GETS #col ID
var select = "col" + (currWeekDay+1);

const months = ["january", "febuary", "march",
"april", "may", "june", "july", "august",
"september", "october", "november", "december"];

//CREATES DOCUMENT NAME FOR CURRENT DAY
var currentDate = day + "" + months[month] + "" + dayNum + "_" + year;


//CHANGE COLUMN COLOURS DEPENDING ON LOG
//#1 FIND LAST SUNDAY!!
//#2 GO THRU DATA FROM WEEK
function weekLog() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        var userHistoryRef = db.collection('users/' + uid + '/history');
        var columnNum = 1;
        var columnSelect = "";

        userHistoryRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if (doc.id == currentDate) {
                logDone();
              }
              
              columnSelect = "col" + columnNum;

              if (doc.get("breakfast") == true) {
                document.getElementById(columnSelect).style.backgroundColor = "#7ffaa0";
              } else if (doc.get("breakfast") == false) {
                document.getElementById(columnSelect).style.backgroundColor = "#f78691";
              } else {
                document.getElementById(columnSelect).style.backgroundColor = "lightgray";
              }

             columnNum++;
          });
        });

      } else {
        // User is signed out
        // ...
      }
    });

}

//UNDO BUTTON FUNCTION
function undoLog(){
    document.getElementById("breakfastButtons").style.display = "flex";
    document.getElementById("question").style.display = "block";
    document.getElementById("undo").style.display = "none";
    document.getElementById("main_body").style.gridTemplateRows = "50% 6% 40%";
    document.getElementById(select).style.backgroundColor = "lightgray";

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        var docHistoryRef = db.collection('users/' + uid + '/history').doc(currentDate);

      docHistoryRef.delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });

      } else {
        // User is signed out
        // ...
      }
    });
    weekLog();
}

//GET RID OF BUTTONS IF USER HAS DONE DAILY LOG
function logDone() {
    document.getElementById("breakfastButtons").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("main_body").style.gridTemplateRows = "60% 6% 70%";
    document.getElementById("undo").style.display = "block";
    console.log("buttons have been removed");
}

//CHANGE TO GREEN IF ATE BREAKFAST
function breakfastTrue() {
    console.log("breakfast selected");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          var userHistoryRef = db.collection('users/' + uid + '/history');
          console.log(currentDate);

          userHistoryRef.doc(currentDate).set({
            breakfast: true
        })
        logDone();
        weekLog();
        } else {
          // User is signed out
          // ...
        }
      });
}

//CHANGE TO RED IF DIDN'T EAT BREAKFAST
function breakfastFalse() {
    console.log("no breakfast today :(");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          var userHistoryRef = db.collection('users/' + uid + '/history');
          console.log(currentDate);

          userHistoryRef.doc(currentDate).set({
            breakfast: false
        })

        logDone();
        weekLog();

        } else {
          // User is signed out
          // ...
        }
      });

}

weekLog();

//LOG BREAKFAST
const eat = document.getElementById("ate");
const noeat = document.getElementById("noeat");

noeat.addEventListener("click", function() {
    breakfastFalse()
});

eat.addEventListener("click", function() {
    breakfastTrue()
});