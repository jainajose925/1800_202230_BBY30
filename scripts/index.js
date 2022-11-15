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

var day = date.getDay();
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

function checkSunday() {
  var temp = new Date(date.getTime());
  while (temp.getDay() != 0) {
    temp.setDate(temp.getDate() - 1);
  }
  temp.setHours(0,0,0,0);
  return temp;
}

//CHANGE COLUMN COLOURS DEPENDING ON LOG
function weekLog() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        var userHistoryRef = db.collection('users/' + uid + '/history');
        var columnSelect = "";

        //ORDER FROM MOST RECENT, LIMIT TO 7
        userHistoryRef.orderBy("date", "desc").limit(7).get().then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
              if (doc.id == currentDate) {
                logDone();
              }
              //CONVERT FIREBASE TIMESTAMP TO JS DATE OBJECT
              const d = await doc.get("date");
              var second = d.seconds;
              var jsDate = new Date(second*1000);

              //GET COLUMN ID
              columnSelect = "col" + (parseInt(jsDate.getDay())+1);
              if (jsDate >= checkSunday()) {
                console.log(jsDate);
                if (doc.get("breakfast") == true) {
                  //CHANGE TO GREEN IF TRUE
                  console.log("true");
                  document.getElementById(columnSelect).style.backgroundColor = "#7ffaa0";
                } else if (doc.get("breakfast") == false) {
                  //CHANGE TO RED IF FALSE
                  console.log("false");
                  document.getElementById(columnSelect).style.backgroundColor = "#f78691";
                } else {
                  //KEEP LIGHT GRAY
                  document.getElementById(columnSelect).style.backgroundColor = "lightgray";
                }
                console.log(columnSelect + "\n");
              }
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
    document.getElementById("main_body").style.gridTemplateRows = "50% 6% 60%";
    document.getElementById(select).style.backgroundColor = "lightgray";

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        var uid = user.uid;
        var docHistoryRef = db.collection('users/' + uid + '/history').doc(currentDate);

      await docHistoryRef.delete().then(() => {
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

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          var uid = user.uid;
          var userHistoryRef = db.collection('users/' + uid + '/history');
          console.log(currentDate);

          await userHistoryRef.doc(currentDate).set({
            breakfast: true,
            date: firebase.firestore.FieldValue.serverTimestamp()  
        });

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

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          var uid = user.uid;
          var userHistoryRef = db.collection('users/' + uid + '/history');
          console.log(currentDate);

          await userHistoryRef.doc(currentDate).set({
            breakfast: false,
            date: firebase.firestore.FieldValue.serverTimestamp() 
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
const undoo = document.getElementById("undo");

undoo.addEventListener("click", function() {
  undoLog()
});

noeat.addEventListener("click", function() {
    breakfastFalse()
});

eat.addEventListener("click", function() {
    breakfastTrue()
});