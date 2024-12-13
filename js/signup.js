import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js'
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPWRocNNSAAbXWmDE6CKougVH-ba1RqpU",
    authDomain: "eduquest-d044b.firebaseapp.com",
    projectId: "eduquest-d044b",
    storageBucket: "eduquest-d044b.appspot.com",
    messagingSenderId: "882071220983",
    appId: "1:882071220983:web:84d511ae469f1cf74759f2",
    databaseURL: "https://eduquest-d044b-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

//Initializing App
const app = initializeApp(firebaseConfig);

//Initializing Database
const database = getDatabase(app);

//Initializing auth
const auth = getAuth(app);


document.getElementById("submitButton").addEventListener("click", registerUser);

function putLoadingScreen(){
  //Put loading screen
  document.getElementById("loading").style.opacity = 100;
  document.getElementById("loading").style.zIndex = 1000;
}

function removeLoadingScreen(){
  //Remove loading screen
  document.getElementById("loading").style.opacity = 0;
  document.getElementById("loading").style.zIndex = 0;
}


function registerUser(){
  putLoadingScreen();

  var nameVal = document.getElementById("name").value;
  var emailVal = document.getElementById("email").value;
  var passVal = document.getElementById("pass").value;
  var isTeacherVal = document.getElementById('isTeacher').checked; 


  if(nameVal == ''){
    alert("Name cannot be empty");
    removeLoadingScreen();
    return;
  }
  if(emailVal == ''){
    alert("Email cannot be empty");
    removeLoadingScreen();
    return;
  }
  if(passVal == ''){
    alert("Password cannot be empty");
    removeLoadingScreen();
    return;
  }
  
  createUserWithEmailAndPassword(auth, emailVal, passVal)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid), {
      name: nameVal,
      email: emailVal,
      isTeacher: isTeacherVal
    }).then(() => {
      //Set local storage
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", emailVal);
      localStorage.setItem("name", nameVal);
      localStorage.setItem("isTeacher", (isTeacherVal == "on")? true : false);

      // DOne
      alert('User Created!!')
      window.location.href = "./user/dashboard.html";
      removeLoadingScreen();
    }).catch((error) => {
      alert(error);
    })

    

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode == "auth/email-already-in-use"){
      alert("Email already in use");
      removeLoadingScreen();
      return;
    }
    else{
      alert(errorCode + errorMessage);
      removeLoadingScreen();
      return;
    }
    
  });
}

/*
User creation response ->
{"uid":"lhb9l7XlJaS7oroP8N0p6CwHyoZ2","email":"saksham2@gmail.com","emailVerified":false,"isAnonymous":false,"providerData":[{"providerId":"password","uid":"saksham2@gmail.com","displayName":null,"email":"saksham2@gmail.com","phoneNumber":null,"photoURL":null}],"stsTokenManager":{"refreshToken":"AMf-vBzoTfQ5rW0k01m7M0iGDDba0XsbPTy_wG5VP_UaLDZ83oPg-Fa-CRtWwljz-C6loS_9UvAnkyHRNIDyJyGTUYcHL6zYarYQSXXjmiNKAt95715eZm_NcGmre_7Ni4z0ZRLxK43XVjJluG50yb9C28blXn3woWOsYtnxmxs-rdcynldoLheLM5IIKApdm449E0aGUIfMu7iUxTlFGIN__cJhebDOuA","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkNzU2OWQyODJkNWM1Mzk5MmNiYWZjZWI2NjBlYmQ0Y2E1OTMxM2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWR1cXVlc3QtZDA0NGIiLCJhdWQiOiJlZHVxdWVzdC1kMDQ0YiIsImF1dGhfdGltZSI6MTcyODEzNDQ1OSwidXNlcl9pZCI6ImxoYjlsN1hsSmFTN29yb1A4TjBwNkN3SHlvWjIiLCJzdWIiOiJsaGI5bDdYbEphUzdvcm9QOE4wcDZDd0h5b1oyIiwiaWF0IjoxNzI4MTM0NDU5LCJleHAiOjE3MjgxMzgwNTksImVtYWlsIjoic2Frc2hhbTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNha3NoYW0yQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.vSV7Xpt4_Vw893tE0ZVQUTgPYq7RSQ3LEGq3SfsmPYCrgvJ5vKKlLNnzZPcZ93GiMmbLKvhHOHAvRx8JkKQMxF4unoSy8fAI6Thm68oAtjOcZCnHb_9L9kWEm03mT62wjSOJv-ve3uTdM9BzxRDbpqNaOdkC0VKLo12qDHmg-muGFDPpTjQV5kf5Vg6cSIY9wAqixVPbWEc5qt8XOFskjuzKwxekjETrJQbP6hEF7OGlkwYLxGG7YeoMfCQ7btnMb1nDVAhk-BfN2XPshTn29c_6DogDi3YTVIj5h0edo1nT4YoWVZpiDECaLeqf2oJ5rH9uhvoMic3pUDEBBJAeJQ","expirationTime":1728138060058},"createdAt":"1728134459584","lastLoginAt":"1728134459584","apiKey":"AIzaSyAPWRocNNSAAbXWmDE6CKougVH-ba1RqpU","appName":"[DEFAULT]"}
*/