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

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(thisRecipeID => {
                console.log(thisRecipeID);
                db.collection("recipes").where("code", "==", thisRecipeID).get().then(snap => {
                    size = snap.size;
                    console.log(size)
                    queryData = snap.docs;

                    if (size == 1) {
                        var doc = queryData[0].data();
                        var recipeName = doc.name; //gets the name field
                        var recipeID = doc.code; //gets the unique ID field
                        var recipeDetails = doc.details; //gets the length field
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = recipeName;
                        newCard.querySelector('.card-details').innerHTML = recipeDetails;
                        newCard.querySelector('img').src = `./images/${recipeID}.jpg`;
                        recipeCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }
                    
                })

            });
        })
}