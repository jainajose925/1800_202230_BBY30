const date = new Date();

const months = ["January", "Febuary", "March",
"April", "May", "June", "July", "August",
"September", "October", "November", "December"];

let day = date.getDay();
let dayNum = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let currMon = months[month] + " " + year;

var firstDay = new Date(year, month, 1);

let currWeekDay = (dayNum + firstDay.getDay() - 1)%7;

let select = "w" + (parseInt((dayNum/7)+1)) + "d" + (currWeekDay + 1);

document.getElementById("currentMonth").innerHTML = currMon;

//GET NUMBER OF DAYS IN A MONTH
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

var maxDate = getDaysInMonth(year, month);
console.log(maxDate);

//CHANGE COLUMN COLOURS DEPENDING ON LOG
function monthLog() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          var userHistoryRef = db.collection('users/' + uid + '/history');
  
          //ORDER FROM MOST RECENT, LIMIT TO MAX DAYS IN A MONTH
          userHistoryRef.orderBy("date", "desc").limit(maxDate).get().then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                //CONVERT FIREBASE TIMESTAMP TO JS DATE OBJECT
                const d = await doc.get("date");
                var second = d.seconds;
                var jsDate = new Date(second*1000);

                let daySelect = "";
  
                //GET PLACE ON CALENDAR GRID
                if (jsDate.getDay() == 0) {
                    daySelect = "w" + (parseInt((jsDate.getDate()/7)+2)) + "d" + (jsDate.getDay() + 1);
                } else {
                    daySelect = "w" + (parseInt((jsDate.getDate()/7)+1)) + "d" + (jsDate.getDay() + 1);
                }
                console.log(daySelect);
                if (jsDate >= firstDay) {
                  console.log(jsDate);
                  if (doc.get("breakfast") == true) {
                    //CHANGE TO GREEN IF TRUE
                    console.log("true");
                    document.getElementById(daySelect).style.backgroundColor = "#7ffaa0";
                  } else if (doc.get("breakfast") == false) {
                    //CHANGE TO RED IF FALSE
                    console.log("false");
                    document.getElementById(daySelect).style.backgroundColor = "#f78691";
                  } else {
                    //KEEP LIGHT GRAY
                    document.getElementById(daySelect).style.backgroundColor = "lightgray";
                  }
                }
            });
          });
        } else {
          // User is signed out
          // ...
        }
      });
  }

  monthLog();