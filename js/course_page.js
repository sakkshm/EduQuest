import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js'
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

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

window.onload = loadCourses;
//window.onload = removeLoadingScreen;


function putLoadingScreen(){
  //Put loading screen
  document.getElementById("loading").style.opacity = 100;
  document.getElementById("loading").style.zIndex = 1000;
}

function removeLoadingScreen(){
  //Remove loading screen
  document.getElementById("loading").style.opacity = 0;
  document.getElementById("loading").style.zIndex = -100;
}

function signOutUser(){
  putLoadingScreen();

  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("uid");
  localStorage.removeItem("isTeacher");

  window.location.href = "../login.html";

  removeLoadingScreen();
}

function loadUserData(){
  putLoadingScreen();
  
  //Getting Local storage value
  var nameVal = localStorage.getItem("name");
  var emailVal = localStorage.getItem("email");
  var uid = localStorage.getItem("uid");
  var isTeacherVal = localStorage.getItem("isTeacher");

  if(nameVal == null && emailVal == null && uid == null && isTeacherVal == null || uid == null){
    alert("No Login Found!!!");
    window.location.href = "login.html";
  }
  if(isTeacherVal == false){
    alert("Only teachers can make a course!!!");
    window.location.href = "../dashboard.html";
  }

  removeLoadingScreen();
  
}



function loadCourses(){

  loadUserData();
  putLoadingScreen();

    


    const DBref = ref(database, 'courses/' + window.location.href.split("?")[1]);
    onValue(DBref, (snapshot) => {
      const data = snapshot.val();

      //alert(JSON.stringify(data));
    
        document.getElementById("main-content").innerHTML += `
                                    
                                            <h1 class="mb-2 fw-bold" id="title">
                                                `+ data["title"] +`
                                            </h1>
                                            <br/>
                                            <p class="mb-2 fw-bold" id="desc">
                                                `+ data["desc"] +`
                                            </p>
                                                            
                                             <p class="fw-bold" id="creator" style="color: #141414">
                                                Made by `+ data["creator"]  +`
                                            </p>
                                              
                                             <br/>
                                             <br/>                   

                                             <div class="accordion accordion-flush" id="accordionFlushExample">

    

                                           `;

                                        var vidList = data["videos"];

                                        for(var i = 0; i < vidList.length; i++){


                                            document.getElementById("main-content").innerHTML += `

                                            <br/><br/>
                                            <h3> Lesson # `+ (i + 1) +` </h3>
                                            <br/><br/>
                                             <iframe width="100%" height="500px"
src="https://www.youtube.com/embed/`+ vidList[i].split("=")[1] +`">
</iframe> 

                                           `;
                                        }


      
      removeLoadingScreen();
    });
}


/*

 <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
    </div>
  </div>


{"793Lg":{"desc":"Short Description","img":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg","title":"First Course","videos":["https://www.youtube.com/watch?v=W33XBIS28ug","https://www.youtube.com/watch?v=W33XBIS28ug","https://www.youtube.com/watch?v=W33XBIS28ug","https://www.youtube.com/watch?v=W33XBIS28ug"]}}

<div class="card mb-3" style="max-width: 90%;">
                                    <div class="row">
                                      <div class="col-md-4">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/440px-Image_created_with_a_mobile_phone.png" class="card-img" alt="..." style="max-height: 200px;">
                                      </div>
                                      <div class="col-md-4">
                                       <div style="margin: 20px;">
                                            <h4 class="mb-2 fw-bold" id="name">
                                                Name
                                            </h4>
                                            <p class="mb-2 fw-bold" id="uid">
                                                UID
                                            </p>
                                            <span class=" text-success me-3" id="email">
                                                E Mail
                                            </span>
                                            <span class="fw-bold" id="isTeacher">
                                                isTeacher
                                            </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>


User creation response ->
{"uid":"lhb9l7XlJaS7oroP8N0p6CwHyoZ2","email":"saksham2@gmail.com","emailVerified":false,"isAnonymous":false,"providerData":[{"providerId":"password","uid":"saksham2@gmail.com","displayName":null,"email":"saksham2@gmail.com","phoneNumber":null,"photoURL":null}],"stsTokenManager":{"refreshToken":"AMf-vBzoTfQ5rW0k01m7M0iGDDba0XsbPTy_wG5VP_UaLDZ83oPg-Fa-CRtWwljz-C6loS_9UvAnkyHRNIDyJyGTUYcHL6zYarYQSXXjmiNKAt95715eZm_NcGmre_7Ni4z0ZRLxK43XVjJluG50yb9C28blXn3woWOsYtnxmxs-rdcynldoLheLM5IIKApdm449E0aGUIfMu7iUxTlFGIN__cJhebDOuA","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkNzU2OWQyODJkNWM1Mzk5MmNiYWZjZWI2NjBlYmQ0Y2E1OTMxM2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWR1cXVlc3QtZDA0NGIiLCJhdWQiOiJlZHVxdWVzdC1kMDQ0YiIsImF1dGhfdGltZSI6MTcyODEzNDQ1OSwidXNlcl9pZCI6ImxoYjlsN1hsSmFTN29yb1A4TjBwNkN3SHlvWjIiLCJzdWIiOiJsaGI5bDdYbEphUzdvcm9QOE4wcDZDd0h5b1oyIiwiaWF0IjoxNzI4MTM0NDU5LCJleHAiOjE3MjgxMzgwNTksImVtYWlsIjoic2Frc2hhbTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNha3NoYW0yQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.vSV7Xpt4_Vw893tE0ZVQUTgPYq7RSQ3LEGq3SfsmPYCrgvJ5vKKlLNnzZPcZ93GiMmbLKvhHOHAvRx8JkKQMxF4unoSy8fAI6Thm68oAtjOcZCnHb_9L9kWEm03mT62wjSOJv-ve3uTdM9BzxRDbpqNaOdkC0VKLo12qDHmg-muGFDPpTjQV5kf5Vg6cSIY9wAqixVPbWEc5qt8XOFskjuzKwxekjETrJQbP6hEF7OGlkwYLxGG7YeoMfCQ7btnMb1nDVAhk-BfN2XPshTn29c_6DogDi3YTVIj5h0edo1nT4YoWVZpiDECaLeqf2oJ5rH9uhvoMic3pUDEBBJAeJQ","expirationTime":1728138060058},"createdAt":"1728134459584","lastLoginAt":"1728134459584","apiKey":"AIzaSyAPWRocNNSAAbXWmDE6CKougVH-ba1RqpU","appName":"[DEFAULT]"}
*/
