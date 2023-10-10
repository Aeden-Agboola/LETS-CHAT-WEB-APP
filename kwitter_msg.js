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
user_name = localStorage.getItem("user_name_key")
room_name = localStorage.getItem("room_name_key")

function send (){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0    
      });
      document.getElementById("msg").value = "";
}

function logout(){
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location = "index.html";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        subfolder_name = childKey;
                        subfolder_data = childData;
                        console.log(subfolder_name);
                        db_name = subfolder_data["name"];
                        db_msg = subfolder_data["message"];
                        db_like = subfolder_data["like"];
                        nametag = '<h4>'+ db_name + '<img src="tick.png" class="user_tick"> </h4>';
                        messagetag = '<h4 class="message_h4">' + db_msg + '</h4>';
                        btnstarttag= '<button id = "' + subfolder_name + '" onclick ="add_likes(this.id)" value="' + db_like + '"class="btn btn-success">';
                        btntexttag= '<span class="glyphicon glyphicon-thumbs-up"> Like:' + db_like + '</span> </button> <hr>';
                        document.getElementById("output").innerHTML += nametag + messagetag + btnstarttag + btntexttag;
                        //Start code

                        //End code
                  }
            });
      });
}
getData();

function add_likes(sub_name){
      likes = document.getElementById(sub_name).value;
      likes = Number(likes) + 1;
      firebase.database().ref(room_name).child(sub_name).update({
            like: likes
      });
}