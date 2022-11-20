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
              //GET PERCENTAGE
              score = Math.round((stat/dayN)*100) + '%';
              falseScore = (100 - Math.round((stat/dayN)*100)) + '%';
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

      updateAvatar();
      document.getElementById("breakfastTrue").style.width = score;
      document.getElementById("breakfastFalse").style.width = falseScore;
      $("#stat-goes-here").text(score);

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
      updateAvatar();

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

      getScore();

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
      var currentScore;
      var currentImg;
      var num;

      await userRef.get().then(async (doc) => {
          if (doc.exists) {
              //GET BREAKFAST COUNT
              avatar = await doc.get('avatar')
              stat = await doc.get('bCount')
              //GET PERCENTAGE
              currentScore = Math.round((stat/dayN)*100);
              console.log(avatar)
              console.log(currentScore)

              if (currentScore >= 80 || currentScore == isNaN) {
                num = 0;
              } else if (currentScore >= 50) {
                num = 1;
              } else {
                num = 2;
              }

              currentImg = "../images/avatars/" + avatar + "" + num + ".png";
              console.log(currentImg)

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