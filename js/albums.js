function renderAlbums() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            let nameUser = document.getElementById("nameUser");
            let cardUser = document.getElementById("cardUser");
            let uid = user.uid;
            db.collection("users").doc(uid).get().then((doc) => {
                nameUser.innerHTML = doc.data().name;
                cardUser.innerHTML = "Album of " + doc.data().name;
                
            })
            // .orderBy("uploadedAt")
            db.collection("album").where("author", "==", uid).orderBy('uploadedAt', 'asc').get().then((snapshot) => {
                let listAlbum = document.getElementById("listAlbum");
                listAlbum.innerHTML = "";
                albumListString = "";
                snapshot.forEach((doc) => {
                    albumListString += `<div class="card m-2"  style="width:300px">
                <img src="${doc.data().url}"  alt="${doc.data().description}" class="card-img-top img-fluid">
                <div class="card-body">
                  <h5 class="card-title">${doc.data().name}</h5>
                  <p class="card-text">${doc.data().description}</p>
                  <a href="#" class="btn btn-primary">${doc.data().uploadedAt.toDate().toLocaleTimeString('en-US')} </a></br></br>
                  <button class="btn btn-primary del" data-index="${doc.id}">Delete</button>
                  <button class="btn btn-primary update" data-index="${doc.id}">Update</button>
                </div></div>`

                })
                listAlbum.innerHTML = albumListString;

                let delbtn = document.getElementsByClassName('del');
                for (let i = 0; i < delbtn.length; i++) {
                    delbtn[i].addEventListener("click", function () {
                        let id = this.getAttribute("data-index")
                        db.collection("album").doc(id).delete().then(function () {
                            console.log("Document successfully deleted!");
                            alert("Delete successfully!")
                            renderAlbums()
                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                            renderAlbums()
                        });

                    })
                }
                let updatebtn = document.getElementsByClassName('update');
                for (let i = 0; i < updatebtn.length; i++) {
                    updatebtn[i].addEventListener("click", function () {
                        input = document.getElementById("upload")
                        let id = this.getAttribute("data-index")
                        let upRef = db.collection("album").doc(id);
                        auth.onAuthStateChanged(function (user) {
                            if (user) {
                                const selectedFile = document.getElementById('upload').files[0];
                                imagesRef = storageRef.child('albums/' + user.uid + '/' + selectedFile.name);
                                imagesRef.put(selectedFile).then((snapshot) => {
                                    console.log('Uploaded a blob or file!');
                                    imagesRef.getDownloadURL()
                                        .then((url) => {
                                            upRef.update({
                                                url: url,
                                                uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
                                            }).then((docRef) => {
                                                alert("Update successfully!");
                                                renderAlbums()
                                            }).catch((err) => {
                                                console.log("X" + err.message);
                                                renderAlbums()
                                            })
                    
                    
                                        })
                                        .catch((error) => {
                                            // Handle any errors
                                            console.log("y" + error.message);
                                        });
                    
                                });
                            }
                        });
                    })
                }
            })
        } else {
            window.location.href = "login.html";
        }
    })
}

setInterval(renderAlbums, 2000);


////


let uploadImageForm = document.getElementById("uploadImageForm");
let nameImage = document.getElementById("nameImage");
let descriptionImage = document.getElementById("descriptionImage");
let storageRef = storage.ref();
uploadImageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    auth.onAuthStateChanged(function (user) {
        if (user) {
            const selectedFile = document.getElementById('upload').files[0];
            imagesRef = storageRef.child('albums/' + user.uid + '/' + selectedFile.name);
            imagesRef.put(selectedFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                imagesRef.getDownloadURL()
                    .then((url) => {
                        db.collection("album").add({
                            name: nameImage.value,
                            description: descriptionImage.value,
                            url: url,
                            author: user.uid,
                            uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        }).then((docRef) => {
                            alert("Upload successfully!");
                        }).catch((err) => {
                            console.log("X" + err.message);
                        })


                    })
                    .catch((error) => {
                        // Handle any errors
                        console.log("y" + error.message);
                    });

            });
        }
    });
})

let nameuser = document.getElementById('nameUser');
nameuser.addEventListener('click', function () {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
})