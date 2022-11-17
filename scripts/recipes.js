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
        code: "R01",
        name: "Microwave Egg Oatmeal",    //replace with your own city?
        time: "5",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    recipesRef.add({
        code: "GG01",
        name: "Protein Breakfast Sandwich",    //replace with your own city?
        time: "5",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    recipesRef.add({
        code: "PB01",
        name: "Turmeric Tofu Scramble",    //replace with your own city?
        time: "7",
        details: "Breakfast Description",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
}

function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("recipeCardTemplate");  //card template
    let hikeCardGroup = document.getElementById("recipeCardGroup");   //where to append card
  
    //doublecheck: is your Firestore collection called "hikes" or "Hikes"?
    db.collection("recipes")
    // .where("city","==","Burnaby")
    // .orderBy("length")
    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes => {
        allRecipes.forEach(doc => {
          var recipeName = doc.data().name; //gets the name field
          var recipeID = doc.data().code; //gets the unique ID field
          var recipeDetails = doc.data().details; //gets the length field
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title').innerHTML = recipeName;
          testRecipeCard.querySelector('.card-details').innerHTML = recipeDetails;
          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID);
  
          //next 2 lines are new for demo#11
          //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
          //so later we know which hike to bookmark based on which hike was clicked
          testRecipeCard.querySelector('i').id = 'save-' + recipeID;
          // this line will call a function to save the hikes to the user's document             
          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID}.jpg`;
          testRecipeCard.querySelector('.details').href = "eachRecipe.html?recipeName="+recipeName +"&id=" + recipeID;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }
  populateCardsDynamically();

  function setRecipeData(id) {
    localStorage.setItem('recipeID', id);
  }
  
  //-----------------------------------------------------------------------------
  // This function is called whenever the user clicks on the "bookmark" icon.
  // It adds the hike to the "bookmarks" array
  // Then it will change the bookmark icon from the hollow to the solid version. 
  //-----------------------------------------------------------------------------
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