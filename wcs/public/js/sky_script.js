  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "",
    authDomain: "webvoice-bbbf8.firebaseapp.com",
    databaseURL: "https://webvoice-bbbf8.firebaseio.com",
    projectId: "webvoice-bbbf8",
    storageBucket: "webvoice-bbbf8.appspot.com",
    messagingSenderId: "580579969688",
  };
  firebase.initializeApp(firebaseConfig);

//Msg送信準備
const newPostRef = firebase.database();

let room = "ryo123454321";

const username = document.getElementById("username");
const output = document.getElementById("output")


//Msg受信処理
//--------------- 変更 Msg受信処理を関数化---------------//
function text(){
  newPostRef.ref(room).on("child_added", function (data) {
    const v = data.val();
    const k = data.key;
    let str = "";
  
    str += '<div id="' + k + '" class="msg_main">'
    str += '<div class="msg_left">';
    str += '<div class=""><img src="img/man.png" alt="" class="icon ' + v.username +
      '" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">' + v.time + '</div>';
    str += '</div>';
    str += '</div>';
  
    output.innerHTML += str;

    //--------------- 追加 自動スクロール機能を追加 ---------------//
    $("#output").scrollTop( $("#output")[0].scrollHeight );
  
  });

}

//時間を取得する関数
function time() {
  var date = new Date();
  var hh = ("0" + date.getHours()).slice(-2);
  var min = ("0" + date.getMinutes()).slice(-2);
  var sec = ("0" + date.getSeconds()).slice(-2);

  var time = hh + ":" + min + ":" + sec;
  return time;
}

//音声認識処理
const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const join = document.getElementById('join');
const content = document.getElementById('content');

join.addEventListener('click', function () {

    room = document.getElementById('join-room').value;
    
    speech.start();

    text();
});

const endcall = document.getElementById('end-call');
endcall.addEventListener('click', function(){
  location.reload();
})

speech.onresult = function (e) {
    speech.stop();
    if (e.results[0].isFinal) {
      var autotext = e.results[0][0].transcript
      console.log(e);
      console.log(autotext);

      newPostRef.ref(room).push({
        username: username.value,
        text: autotext,
        time: time()
      });
      
    }
}

speech.onend = () => {
    speech.start()
};

