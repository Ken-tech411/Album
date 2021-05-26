let signinbtn = document.getElementById("signinbtn")
let name = document.getElementById("nametxt")
let email = document.getElementById("emailtxt")
let password = document.getElementById("passwordtxt")


signinbtn.addEventListener('click', function () {
    auth.signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            let uid = user.uid;
            db.collection('users').doc(uid).get({
                email: email.value,
                password: password.value
            }).then(function () {
                alert("Welcome Back")
                window.location.href = ("/album.html")
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
})