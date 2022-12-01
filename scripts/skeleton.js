//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log("hi");
    $('#navbarPlaceholder').load('/text/nav.html');
    //console.log($('#footerPlaceholder').load('./text/footer.html'));
}
loadSkeleton();  //invoke the function

/*const logoutButton = document.getElementById("#logout")
  logoutButton.addEventListener('click', function(){
    logout()
  }
)*/


function logout() {
console.log("logging out user");
firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "login.html";
  }).catch((error) => {
    // An error happened.
  });
}