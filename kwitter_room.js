var firebaseConfig = {
      apiKey: "AIzaSyDYbHu0mBzKFSkkXhPD5ShTrZPMj_CDP54",
      authDomain: "kwitter-1e44f.firebaseapp.com",
      databaseURL: "https://kwitter-1e44f-default-rtdb.firebaseio.com",
      projectId: "kwitter-1e44f",
      storageBucket: "kwitter-1e44f.appspot.com",
      messagingSenderId: "992771094938",
      appId: "1:992771094938:web:328c86259cefaa854e6223"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("user_name_key")
document.getElementById("user_name").innerHTML ="welcome "+ username;

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"room creation"
      });
      localStorage.setItem("room_name_key", room_name)
      window.location="kwitter_msg.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  main_folder_names = childKey;
                  console.log(main_folder_names)
                  
                  div_tag='<div id="'+main_folder_names+'" onclick="redirect(this.id)" class="room_name">'+main_folder_names+'</div><hr>';
                  document.getElementById("output").innerHTML+=div_tag;
            });
      });
}

function redirect(room_id){
      localStorage.setItem("room_name_key", room_id);
      window.location="kwitter_msg.html";
}

function logout(){
      localStorage.removeItem("user_name_key")
      localStorage.removeItem("room_name_key")
      window.location="index.html";
}


getData();