function writeRecipes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var recipesRef = db.collection("recipes");

    recipesRef.add({
        code: "GNG1",
        name: "Toast and Carrots1",    //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    recipesRef.add({
        code: "GNG1",
        name: "Toast and Carrots2",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5",
        details: "Breakfast Description",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
    recipesRef.add({
        code: "GNG1",
        name: "Toast and Carrots3",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2",
        details: "Breakfast Description",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("recipeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
								var recipeID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${recipeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("recipes");