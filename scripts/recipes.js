var currentUser;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
    console.log(currentUser);

    //POPULATE RECIPES
    populateCardsDynamically_GRABGO()
    populateCardsDynamically_PROTEIN()
    populateCardsDynamically_VEG()

  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

//WRITE RECIPES
function writeRecipes() {
    var recipesRef = db.collection("recipes");

    recipesRef.doc("MEO").set({
        code: "MEO",
        name: "Microwave Egg Oatmeal",
        time: "5 mins",
        details: "Excellent source of protein!",
        category: "protein",
        link: "microwaveEggOatmeal",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("PB").set({
      code: "PB01",
      name: "Protein Breakfast Sandwich",
      time: "5 mins",
      details: "Quick and easy!",
      category: "protein",
      link: "proteinBreakfastSandwich",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("TTS").set({
      code: "TTS",
      name: "Turmeric Tofu Scramble",  
      time: "7 mins",
      details: "Healthy and delicious!",
      category: "protein",
      link: "turmericTofuScramble",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("VQ").set({
      code: "VQ",
      name: "Veggie Quesadilla",
      time: "5 mins",
      details: "Customizable and easy!",
      category: "veg",
      link: "veggieQuesadilla",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("VMF").set({
      code: "VMF",
      name: "Veggie Mini Frittatas",
      time: "5 mins",
      details: "Quick veggie option!",
      category: "veg",
      link: "veggieMiniFrittatas",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("AT").set({
      code: "AT",
      name: "Avocado Toast",
      time: "5 mins",
      details: "Go-to for many!",
      category: "veg",
      link: "avocadoToast",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("PRB").set({
      code: "PRB",
      name: "Protein Bar",
      details: "Fast and rich!",
      category: "grabGo",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("SMU").set({
      code: "SMU",
      name: "Smoothie",    
      details: "As healthy as can be!",
      category: "grabGo",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

    recipesRef.doc("FRU").set({
      code: "FRU",
      name: "Fruits",
      details: "The old trusty!",
      category: "grabGo",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

//POPULATE CARDS IN PROTEIN SECTION
function populateCardsDynamically_PROTEIN() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate");  
    let recipeCardGroupPRO = document.getElementById("recipeCardGroupPROTEIN");
  
    db.collection("recipes")
       .where("category","==","protein")
      .get()
      .then(allRecipes => {
        allRecipes.forEach(doc => {
          let recipeName = doc.data().name; //gets the name field
          let recipeID = doc.data().code; //gets the unique ID field
          let recipeDetails = doc.data().details; //gets the length field
          let recipeTime = doc.data().time;
          let recipeLink = doc.data().link;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title').innerHTML = recipeName;
          testRecipeCard.querySelector('.card-details').innerHTML = recipeDetails;
          testRecipeCard.querySelector('.card-time').innerHTML = recipeTime;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID}.jpg`;
          testRecipeCard.querySelector('a').href = recipeLink + ".html";
          recipeCardGroupPRO.appendChild(testRecipeCard);
        })
      })
  }

  //POPULATE CARDS FOR VEGETARIAN SECTION
  function populateCardsDynamically_VEG() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate0");  
    let recipeCardGroupVEG = document.getElementById("recipeCardGroupVEG");
  
    db.collection("recipes")
       .where("category","==","veg")
      .get()
      .then(allRecipes => {
        allRecipes.forEach(doc => {
          let recipeName = doc.data().name;
          let recipeID = doc.data().code; 
          let recipeDetails = doc.data().details;
          let recipeTime = doc.data().time;
          let recipeLink = doc.data().link;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-titleV').innerHTML = recipeName;
          testRecipeCard.querySelector('.card-detailsV').innerHTML = recipeDetails;
          testRecipeCard.querySelector('.card-timeV').innerHTML = recipeTime;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID);
  
          testRecipeCard.querySelector('i').id = 'save-' + recipeID;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID}.jpg`;
          testRecipeCard.querySelector('a').href = recipeLink + ".html";
          recipeCardGroupVEG.appendChild(testRecipeCard);
        })
      })
  }

  //POPULATE CARDS FOR GRAB N GO SECTION
  function populateCardsDynamically_GRABGO() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplateNOLINK");  
    let recipeCardGroupGRAB = document.getElementById("recipeCardGroupGRAB");   
  
    db.collection("recipes")
       .where("category","==","grabGo")
      .get()
      .then(allRecipes => {
        allRecipes.forEach(doc => {
          let recipeName = doc.data().name; 
          let recipeID = doc.data().code; 
          let recipeDetails = doc.data().details; 
          let recipeTime = doc.data().time;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-titleG').innerHTML = recipeName;
          testRecipeCard.querySelector('.card-detailsG').innerHTML = recipeDetails;
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID}.jpg`;
          recipeCardGroupGRAB.appendChild(testRecipeCard);
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

        document.getElementById(iconID).innerText = 'bookmark';
      });
  }








