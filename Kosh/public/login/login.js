var config = {
    apiKey: "AIzaSyB4xvaSLQFUwvMdK1DZGLIGb1pNe_R1KhA",
    authDomain: "mudrakosh-a1b1b.firebaseapp.com",
    databaseURL: "https://mudrakosh-a1b1b-default-rtdb.firebaseio.com/",
    projectId: "mudrakosh-a1b1b",
    storageBucket: "mudrakosh-a1b1b.appspot.com",
    messagingSenderId: "734939402803",
    appId: "1:734939402803:web:a5285f822deef239be4946",

    clientId: "734939402803-pit6jj4miaa74nt8c8r1buf0oqndc3qg.apps.googleusercontent.com",

    scopes: [
        "email",
        "profile"
    ]
};


firebase.initializeApp(config);
// let signInURL = 'registration/registration.html';

var signInURL = '';


console.log(signInURL);

firebase.auth().setPersistence(
    firebase.auth.Auth.Persistence.LOCAL);
var uiConfig = {

    signInOptions: [
        {
            // Leave the lines as is for the providers you want to offer your users.
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },

        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
                type: 'image', // 'audio'
                size: 'normal', // 'invisible' or 'compact'
                badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
            defaultCountry: 'IN', // Set default country to the United Kingdom (+44).
            // For prefilling the national number, set defaultNationNumber.
            // This will only be observed if only phone Auth provider is used since
            // for multiple providers, the NASCAR screen will always render first
            // with a 'sign in with phone number' button.
            defaultNationalNumber: '1234567890',
            // You can also pass the full phone number string instead of the
            // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
            // the first country ID that matches the country code will be used to
            // populate the country selector. So for countries that share the same
            // country code, the selected country may not be the expected one.
            // In that case, pass the 'defaultCountry' instead to ensure the exact
            // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
            // will always have higher priority than 'loginHint' which will be ignored
            // in their favor. In this case, the default country will be 'GB' even
            // though 'loginHint' specified the country code as '+1'.
            loginHint: '+11234567890'
        },

        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
                'https://www.googleapis.com/auth/contacts.readonly'
            ],
            customParameters: {
                prompt: 'select_account'
            }
        }

        //TODO:-- emailLinkSignIn

    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    },

    signInFlow: 'popup',

    //signInSuccessUrl: signInURL,
    //signInSuccessUrl: 'login.html'
    //signInSuccessUrl: '../successLogin/success.html'
    //signInSuccessUrl: 'https://www.google.com/'

    'callbacks': {
        'signInSuccess': function () {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.user = user;

                    //username.innerHTML = user.displayName;
                    UserID = firebase.auth().currentUser.uid;
                    console.log(UserID);

                    firebase.database().ref('users/' + UserID + '/registration/role').once('value', (snap) => {
                        var role = snap.val();
                        console.log(role);

                        let isSigned = false;

                        if (role == null) {
                            isSigned = false;
                            window.location.href = 'registration/registration.html';

                        } else if (role == 'borrower') {
                            isSigned = true;
                            //window.location.href = '../profile/borrower/borrowerProfile.html';
                            //signInURL = 'registration/registration.html';
                            window.location.href = '../otpVerif/otpVer.html';
                        } else if (role == 'investor') {
                            isSigned = true;
                            window.location.href = '../otpVerif/otpVer.html';
                        }

                        console.log(isSigned);
                    });

                    console.log(signInURL);



                }
                else {
                    console.log("User not signed in");
                }
            });
            return false;
        }
    }

};



// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// Is there an email link sign-in?
if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', uiConfig);
}


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //this.user = user;

        //username.innerHTML = user.uid;
        //username = user.uid;
        //console.log(user.uid);
        console.log("xyz");
    }
    else {
        console.log("abc")
    }
});

