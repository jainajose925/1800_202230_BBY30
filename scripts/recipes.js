var currentUser;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);   //global
    console.log(currentUser);

    // the following functions are always called when someone is logged in
    populateCardsDynamically();
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

function writeRecipes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var recipesRef = db.collection("recipes");

    recipesRef.add({
        code: "MEO",
        name: "Microwave Egg Oatmeal",    //replace with your own city?
        time: "5 mins",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    recipesRef.add({
        code: "PB01",
        name: "Protein Breakfast Sandwich",    //replace with your own city?
        time: "5 mins",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    recipesRef.add({
        code: "TTS",
        name: "Turmeric Tofu Scramble",    //replace with your own city?
        time: "7 mins",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function populateCardsDynamically() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup");   //where to append card
  
    db.collection("recipes")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes => {
        allRecipes.forEach(doc => {
          var recipeName = doc.data().name; //gets the name field
          var recipeID = doc.data().code; //gets the unique ID field
          var recipeDetails = doc.data().details; //gets the length field
          var recipeTime = doc.data().time;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title').innerHTML = recipeName;
          testRecipeCard.querySelector('.card-details').innerHTML = recipeDetails;
          testRecipeCard.querySelector('.card-time').innerHTML = recipeTime;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID}.jpg`;
          testRecipeCard.querySelector('.details').href = "proteinBreakfastSandwich.html?recipeName="+recipeName +"&id=" + recipeID;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function setRecipeData(id) {
    localStorage.setItem('recipeID', id);
  }
  
  
  function saveBookmark(recipeID) {
    currentUser.set({
      bookmarks: firebase.firestore.FieldValue.arrayUnion(recipeID)
    }, {
      merge: true
    })
      .then(function () {
        console.log("bookmark has been saved for: " + currentUser);
        var iconID = 'save-' + recipeID;
        //console.log(iconID);
        //this is to change the icon of the hike that was saved to "filled"
        document.getElementById(iconID).innerText = 'bookmark';
      });
  }