var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        var user = authResult.user;                            
        if (authResult.additionalUserInfo.isNewUser) { 
            var id = user.uid
            db.collection("users").doc(user.uid).set({         
                    name: user.displayName,                    
                    email: user.email,
                    country: "Canada",                       
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("avatarSelect.html");       
                })
                .catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
        } else {
            return true;
        }
        return false;
    },
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  ui.start('#firebaseui-auth-container', uiConfig);