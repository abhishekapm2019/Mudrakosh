var files = [];
document.getElementById("signature-file").addEventListener("change", function (e) {
    files = e.target.files;
});


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.user = user;
        UserID = firebase.auth().currentUser.uid;
        console.log(UserID);

        document.getElementById("send7").addEventListener("click", function () {
            //checks if files are selected
            if (files.length != 0) {

                //Loops through all the selected files
                for (let i = 0; i < files.length; i++) {

                    let fileName = "Signature";

                    console.log(UserID);

                    //create a storage reference
                    var storage = firebase.storage().ref(`${UserID}/${fileName}`);

                    //upload file
                    var upload = storage.put(files[i]);

                    //update progress bar
                    upload.on(
                        "state_changed",
                        function progress(snapshot) {
                            var percentage =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            document.getElementById("progress7").value = percentage;
                        },

                        function error() {
                            alert("error uploading file");
                        },

                        function complete() {
                            document.getElementById(
                                "uploading7"
                            ).innerHTML += `${files[i].name} uploaded <br />`;
                        }
                    );
                }
            } else {
                alert("No file chosen");
            }
        });

    }
    else {
        console.log("User not signed in");
    }
});