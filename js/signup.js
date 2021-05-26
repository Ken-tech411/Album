let signupbtn = document.getElementById("signupbtn")
let nameUser = document.getElementById("nametxt")
let email = document.getElementById("emailtxt")
let password = document.getElementById("passwordtxt")

signupbtn.addEventListener('click', function () {
    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            let uid = user.uid;
            db.collection('users').doc(uid).set({
                name: nameUser.value,
                email: email.value,
                password: password.value
            }).then(function () {
                console.log("Document successfully written!")
                alert("Successfully sign up")
                window.location.href = "/login.html"
            })

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
});