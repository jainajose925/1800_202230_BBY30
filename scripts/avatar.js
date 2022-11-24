function saveCactus() {
    saveAvatar("cactus");
}

function saveFlower() {
    saveAvatar("flower");
}

function saveBanana() {
    console.log("selected");
    saveAvatar("banana"); 
}

function saveEgg() {
    saveAvatar("egg");
}


function saveAvatar(name){
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          var uid = user.uid;
          var userRef = await db.collection('users').doc(uid);
    
          await userRef.set({
            avatar: name
          }).then(function () {
            window.location.assign("index.html"); 
        });
    
        } else {
          // User is signed out
          // ...
        }
      });
}