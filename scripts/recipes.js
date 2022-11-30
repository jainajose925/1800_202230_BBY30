var currentUser;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);   //global
    console.log(currentUser);

    // the following functions are always called when someone is logged in
    populateCardsDynamically1();
    populateCardsDynamically2();
    populateCardsDynamically3();
    populateCardsDynamically4();
    populateCardsDynamically5();
    populateCardsDynamically6();
    populateCardsDynamically7();
    populateCardsDynamically8();
    populateCardsDynamically9();

  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

function writeRecipes1() {
    //define a variable for the collection you want to create in Firestore to populate data
    var recipesRef = db.collection("recipes1");

    recipesRef.doc("name1").set({
        code1: "MEO",
        name1: "Microwave Egg Oatmeal",    //replace with your own city?
        time1: "5 mins",
        details1: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function writeRecipes2() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes2");

  recipesRef.doc("name2").set({
      code2: "PB01",
      name2: "Protein Breakfast Sandwich",    //replace with your own city?
      time2: "5 mins",
      details2: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes3() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes3");

  recipesRef.doc("name3").set({
      code3: "TTS",
      name3: "Turmeric Tofu Scramble",    //replace with your own city?
      time3: "7 mins",
      details3: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes4() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes4");

  recipesRef.doc("name4").set({
      code4: "VQ",
      name4: "Veggie Quesadilla",    //replace with your own city?
      time4: "5 mins",
      details4: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes5() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes5");

  recipesRef.doc("name5").set({
      code5: "VMF",
      name5: "Veggie Mini Frittatas",    //replace with your own city?
      time5: "5 mins",
      details5: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes6() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes6");

  recipesRef.doc("name6").set({
      code6: "AT",
      name6: "Avocado Toast",    //replace with your own city?
      time6: "5 mins",
      details6: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes7() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes7");

  recipesRef.doc("name7").set({
      code7: "PRB",
      name7: "Protein Bar",    //replace with your own city?
      details7: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes8() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes8");

  recipesRef.doc("name8").set({
      code8: "SMU",
      name8: "Smoothie",    //replace with your own city?
      details8: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function writeRecipes9() {
  //define a variable for the collection you want to create in Firestore to populate data
  var recipesRef = db.collection("recipes9");

  recipesRef.doc("name9").set({
      code9: "FRU",
      name9: "Fruits",    //replace with your own city?
      details9: "Breakfast Description",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}



function populateCardsDynamically1() {
    let recipeCardTemplate1 = document.getElementById("recipeCardTemplate1");  //card template
    let recipeCardGroup1 = document.getElementById("recipeCardGroup1");   //where to append card
  
    db.collection("recipes1")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes1 => {
        allRecipes1.forEach(doc => {
          var recipeName1 = doc.data().name1; //gets the name field
          var recipeID1 = doc.data().code1; //gets the unique ID field
          var recipeDetails1 = doc.data().details1; //gets the length field
          var recipeTime1 = doc.data().time1;
          let testRecipeCard1 = recipeCardTemplate1.content.cloneNode(true);
          testRecipeCard1.querySelector('.card-title1').innerHTML = recipeName1;
          testRecipeCard1.querySelector('.card-details1').innerHTML = recipeDetails1;
          testRecipeCard1.querySelector('.card-time1').innerHTML = recipeTime1;

          testRecipeCard1.querySelector('a').onclick = () => setRecipeData(recipeID1);
  
          
          testRecipeCard1.querySelector('i').id1 = 'save-' + recipeID1;

          testRecipeCard1.querySelector('i').onclick = () => saveBookmark(recipeID1);
  
          testRecipeCard1.querySelector('img').src = `./images/${recipeID1}.jpg`;
          testRecipeCard1.querySelector('.details').href = "microwaveEggOatmeal.html?recipeName="+recipeName1 +"&id=" + recipeID1;
          recipeCardGroup1.appendChild(testRecipeCard1);
        })
      })
  }

  function populateCardsDynamically2() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate2");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup2");   //where to append card
  
    db.collection("recipes2")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes2 => {
        allRecipes2.forEach(doc => {
          var recipeName2 = doc.data().name2; //gets the name field
          var recipeID2 = doc.data().code2; //gets the unique ID field
          var recipeDetails2 = doc.data().details2; //gets the length field
          var recipeTime2 = doc.data().time2;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title2').innerHTML = recipeName2;
          testRecipeCard.querySelector('.card-details2').innerHTML = recipeDetails2;
          testRecipeCard.querySelector('.card-time2').innerHTML = recipeTime2;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID2);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID2;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID2);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID2}.jpg`;
          testRecipeCard.querySelector('.details').href = "proteinBreakfastSandwich.html?recipeName="+recipeName2 +"&id=" + recipeID2;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically3() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate3");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup3");   //where to append card
  
    db.collection("recipes3")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes3 => {
        allRecipes3.forEach(doc => {
          var recipeName3 = doc.data().name3; //gets the name field
          var recipeID3 = doc.data().code3; //gets the unique ID field
          var recipeDetails3 = doc.data().details3; //gets the length field
          var recipeTime3 = doc.data().time3;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title3').innerHTML = recipeName3;
          testRecipeCard.querySelector('.card-details3').innerHTML = recipeDetails3;
          testRecipeCard.querySelector('.card-time3').innerHTML = recipeTime3;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID3);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID3;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID3);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID3}.jpg`;
          testRecipeCard.querySelector('.details').href = "turmericTofuScramble.html?recipeName="+recipeName3 +"&id=" + recipeID3;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically4() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate4");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup4");   //where to append card
  
    db.collection("recipes4")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes4 => {
        allRecipes4.forEach(doc => {
          var recipeName4 = doc.data().name4; //gets the name field
          var recipeID4 = doc.data().code4; //gets the unique ID field
          var recipeDetails4 = doc.data().details4; //gets the length field
          var recipeTime4 = doc.data().time4;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title4').innerHTML = recipeName4;
          testRecipeCard.querySelector('.card-details4').innerHTML = recipeDetails4;
          testRecipeCard.querySelector('.card-time4').innerHTML = recipeTime4;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID4);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID4;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID4);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID4}.jpg`;
          testRecipeCard.querySelector('.details').href = "veggieQuesadilla.html?recipeName="+recipeName4 +"&id=" + recipeID4;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically5() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate5");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup5");   //where to append card
  
    db.collection("recipes5")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes5 => {
        allRecipes5.forEach(doc => {
          var recipeName5 = doc.data().name5; //gets the name field
          var recipeID5 = doc.data().code5; //gets the unique ID field
          var recipeDetails5 = doc.data().details5; //gets the length field
          var recipeTime5 = doc.data().time5;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title5').innerHTML = recipeName5;
          testRecipeCard.querySelector('.card-details5').innerHTML = recipeDetails5;
          testRecipeCard.querySelector('.card-time5').innerHTML = recipeTime5;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID5);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID5;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID5);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID5}.jpg`;
          testRecipeCard.querySelector('.details').href = "veggieMiniFrittatas.html?recipeName="+recipeName5 +"&id=" + recipeID5;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically6() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate6");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup6");   //where to append card
  
    db.collection("recipes6")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes6 => {
        allRecipes6.forEach(doc => {
          var recipeName6 = doc.data().name6; //gets the name field
          var recipeID6 = doc.data().code6; //gets the unique ID field
          var recipeDetails6 = doc.data().details6; //gets the length field
          var recipeTime6 = doc.data().time6;
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title6').innerHTML = recipeName6;
          testRecipeCard.querySelector('.card-details6').innerHTML = recipeDetails6;
          testRecipeCard.querySelector('.card-time6').innerHTML = recipeTime6;

          testRecipeCard.querySelector('a').onclick = () => setRecipeData(recipeID6);
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID6;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID6);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID6}.jpg`;
          testRecipeCard.querySelector('.details').href = "avocadoToast.html?recipeName="+recipeName6 +"&id=" + recipeID6;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically7() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate7");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup7");   //where to append card
  
    db.collection("recipes7")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes7 => {
        allRecipes7.forEach(doc => {
          var recipeName7 = doc.data().name7; //gets the name field
          var recipeID7 = doc.data().code7; //gets the unique ID field
          var recipeDetails7 = doc.data().details7; //gets the length field
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title7').innerHTML = recipeName7;
          testRecipeCard.querySelector('.card-details7').innerHTML = recipeDetails7;  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID7;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID7);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID7}.jpg`;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically8() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate8");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup8");   //where to append card
  
    db.collection("recipes8")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes8 => {
        allRecipes8.forEach(doc => {
          var recipeName8 = doc.data().name8; //gets the name field
          var recipeID8 = doc.data().code8; //gets the unique ID field
          var recipeDetails8 = doc.data().details8; //gets the length field
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title8').innerHTML = recipeName8;
          testRecipeCard.querySelector('.card-details8').innerHTML = recipeDetails8;
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID8;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID8);
  
          testRecipeCard.querySelector('img').src = `./images/${recipeID8}.jpg`;
          recipeCardGroup.appendChild(testRecipeCard);
        })
      })
  }

  function populateCardsDynamically9() {
    let recipeCardTemplate = document.getElementById("recipeCardTemplate9");  //card template
    let recipeCardGroup = document.getElementById("recipeCardGroup9");   //where to append card
  
    db.collection("recipes9")

    // .orderBy("last_updated")            //NEW LINE;  what do you want to sort by?
    // .limit(2)                       //NEW LINE:  how many do you want to get?
    .get()
      .then(allRecipes9 => {
        allRecipes9.forEach(doc => {
          var recipeName9 = doc.data().name9; //gets the name field
          var recipeID9 = doc.data().code9; //gets the unique ID field
          var recipeDetails9 = doc.data().details9; //gets the length field
          let testRecipeCard = recipeCardTemplate.content.cloneNode(true);
          testRecipeCard.querySelector('.card-title9').innerHTML = recipeName9;
          testRecipeCard.querySelector('.card-details9').innerHTML = recipeDetails9;
  
          
          testRecipeCard.querySelector('i').id = 'save-' + recipeID9;

          testRecipeCard.querySelector('i').onclick = () => saveBookmark(recipeID9);

          testRecipeCard.querySelector('img').src = `./images/${recipeID9}.jpg`;
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

        document.getElementById(iconID).innerText = 'bookmark';
      });
  }

