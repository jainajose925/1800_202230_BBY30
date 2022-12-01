var d = new Date()
var dayN = d.getDate();

//GETS PERCENTAGE OF BREAKFAST EATEN FROM 1ST OF MONTH TO CURRENT DAY
function getScore() {
  firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        var uid = user.uid;
        var userRef = await db.collection('users').doc(uid);
        var score;
        var stat;

        await userRef.get().then(async (doc) => {
          if (doc.exists) {
              //GET BREAKFAST COUNT
              stat = await doc.get('bCount')

              if (isNaN(stat)) {
                $("#stat-goes-here").text("Log your first day!");
              } else if ((dayN == 1 && (stat > 1))) {
                await userRef.set({
                    bCount: 0
                });
                stat = 0;
                $("#stat-goes-here").text("Log your first day of the month!");
              } else {
                //GET PERCENTAGE
                score = Math.round((stat/dayN)*100) + '%';
                falseScore = (100 - Math.round((stat/dayN)*100)) + '%';

                document.getElementById("breakfastTrue").style.width = score;
                document.getElementById("breakfastFalse").style.width = falseScore;
                 $("#stat-goes-here").text(score + " Breakfast Eaten This Month!");
              }
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      updateAvatar();
      } else {
        // User is signed out
        // ...
      }
    });
}

//ADDS 1 TO BCOUNT
function addScore() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      var uid = user.uid;
      var userRef = await db.collection('users').doc(uid);

      userRef.update({
        bCount: firebase.firestore.FieldValue.increment(1)
      });

    } else {
      // User is signed out
      // ...
    }
  });
}

//TAKES 1 AWAY FROM SCORE
function undoScore() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      var uid = user.uid;
      var userRef = await db.collection('users').doc(uid);

      await userRef.update({
        bCount: firebase.firestore.FieldValue.increment(-1)
      });

    } else {
      // User is signed out
      // ...
    }
  });
}

//UPDATES AVATAR TO HAPPY, SAD, OR NEUTRAL
function updateAvatar() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      var uid = user.uid;
      var userRef = await db.collection('users').doc(uid);
      var userHistoryRef = db.collection('users/' + uid + '/history');
      var currentScore;
      var currentImg;
      var num;

      userHistoryRef.get().then(snap => {
        size = snap.size // will return the collection size
      });

      await userRef.get().then(async (doc) => {
          if (doc.exists) {
              //GET BREAKFAST COUNT
              avatar = await doc.get('avatar')
              stat = await doc.get('bCount')
              //GET PERCENTAGE
              currentScore = Math.round((stat/dayN)*100);
              console.log(avatar)
              console.log(currentScore)

              //IF NAN -> NEW USER, HAPPY PLANT FOR FIRST DAY
              if(isNaN(currentScore)) {
                num = 0;
              } else if (currentScore >= 80 || dayN == 1 || size <= 3) {
                num = 0;
              } else if (currentScore >= 50) {
                num = 1;
              } else {
                num = 2;
              }
              console.log(stat);
              currentImg = "../images/avatars/" + avatar + "" + num + ".png";

              document.getElementById("img").src = currentImg;

          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

    } else {
      // User is signed out
      // ...
    }
  });
}