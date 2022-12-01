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
                if (doc.get("breakfast") == true) {
                  //CHANGE TO GREEN IF TRUE
                  document.getElementById(columnSelect).style.backgroundColor = "#7ffaa0";
                } else if (doc.get("breakfast") == false) {
                  //CHANGE TO RED IF FALSE
                  document.getElementById(columnSelect).style.backgroundColor = "#f78691";
                } else {
                  //KEEP LIGHT GRAY
                  document.getElementById(columnSelect).style.backgroundColor = "lightgray";
                }
              }
          });
          getScore();

        });
      } else {
        // User is signed out
        // ...
      }
    });
}

//UNDO BUTTON FUNCTION
function undoLog(){
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        var uid = user.uid;
        var docHistoryRef = await db.collection('users/' + uid + '/history').doc(currentDate);

        await docHistoryRef.get().then(async (doc) => {
          if (doc.exists) {
            if (await doc.get("breakfast") == true) {
              undoScore();
            }
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

       await docHistoryRef.delete().then(() => {
       }).catch((error) => {
           console.error("Error removing document: ", error);
       });

      } else {
        // User is signed out
        // ...
      }

      weekLog();

      document.getElementById("breakfastButtons").style.display = "flex";
      document.getElementById("question").style.display = "block";
      document.getElementById("undo").style.display = "none";
      document.getElementById("main_body").style.gridTemplateRows = "50% 8% 50%";
      document.getElementById(select).style.backgroundColor = "lightgray";

    });
}

//GET RID OF BUTTONS IF USER HAS DONE TODAY'S LOG
function logDone() {
    document.getElementById("breakfastButtons").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("main_body").style.gridTemplateRows = "50% 8% 50%";
    document.getElementById("undo").style.display = "block";
    console.log("buttons have been removed");
}

//ADD DATA IF ATE BREAKFAST
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
        addScore();
        weekLog();
        } else {
          // User is signed out
          // ...
        }
      });
}

//ADD DATA IF DIDN'T EAT BREAKFAST
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
const undo = document.getElementById("undo");

undo.addEventListener("click", function() {
  undoLog()
});

noeat.addEventListener("click", function() {
    breakfastFalse()
});

eat.addEventListener("click", function() {
    breakfastTrue()
});

// function to make alert to show up at different times.
function eatNotification(){
  const hour = date.getHours();
  const min = date.getMinutes();

  console.log(hour + ":" + min +" = current time");

  if (hour == 20 && min == 1){
    console.log("its 8pm " + hour);
    swal("Time to prepare tomorrow's breakfast", "Check the recipes page for ideas.", "info");

  } else if (hour == 9 && min == 1){
    console.log("its 9am " + hour);
    swal("Don't forget to take your breakfast!", "Conquer the Day!", "info");
  }
   
}
eatNotification()


