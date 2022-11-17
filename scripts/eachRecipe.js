function populateEachRecipe() {
    let recipeCardTemplate = document.getElementById("CardTemplate");
    let recipeCardGroup = document.getElementById("CardGroup");

    let params = new URL(window.location.href);         //get URL of search bar
    let recipeCode = params.searchParams.get("id");       //get value for key "id"
    let recipeName = params.searchParams.get("recipeName"); //get value for key "hikeNam
    document.getElementById("RecipeName").innerHTML = recipeName; 
    document.getElementById("details-go-here").innerHTML = message; 
}
populateEachRecipe();