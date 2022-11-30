firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});


function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate1 = document.getElementById("CardTemplate1");
            bookmarks.forEach(thisRecipeID => {
                console.log(thisRecipeID);
                db.collection("recipes1").where("code", "==", thisRecipeID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;

                    if (size == 1) {
                        var doc = queryData[0].data();
                        var recipeName1 = doc.name1; //gets the name field
                        var recipeID1 = doc.code1; //gets the unique ID field
                        var recipeDetails1 = doc.details1; //gets the length field
                        let newCard = CardTemplate1.content.cloneNode(true);
                        newCard.querySelector('.card-title1').innerHTML = recipeName1;
                        newCard.querySelector('.card-details1').innerHTML = recipeDetails1;
                        newCard.querySelector('a').onclick = () => setRecipeData(recipeID1);
                        newCard.querySelector('img').src = `./images/${recipeID1}.jpg`;
                        recipeCardGroup1.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }
                    

                })

            });
        })
}