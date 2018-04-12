/* global firebase moment */

// <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>

//new firebase code
  // Initialize Firebase (new vers 4/11/18... 11:02am)
var config = {
   apiKey: "AIzaSyDc_3A31WIH08AXrGk8QusY5YWfX-qKnEI",
   authDomain: "traintracker-94b09.firebaseapp.com",
   databaseURL: "https://traintracker-94b09.firebaseio.com",
   projectId: "traintracker-94b09",
   storageBucket: "",
   messagingSenderId: "544426864840"
};
 firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding trains

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#first-train-time-input").val().trim(), "hh:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var trainTracker = {
    name: trainName,
    dest: trainDest,
    start: firstTrainTime,
    freq: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(trainTracker);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  // $("#train-name-input").val("");
  // $("#destination-input").val("");
  // $("#first-train-time-input").val("");
  // $("#frequency-input").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var firstTrainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().freq;

  var test = parseInt(firstTrainTime) + parseInt(trainFrequency * 60);
  // Prettify the train data
  var trainStart = moment.unix(firstTrainTime).format("hh:mm A");


  // check if current time exceeds arrival time & make sure minutes away is a positive number 
  var unixFirsTrainTime = moment.unix(firstTrainTime, "X");
  var now = moment();
  var trainTimeRemaining = 0;
  if(unixFirsTrainTime > now) {
    trainTimeRemaining = unixFirsTrainTime.diff(moment(), "minutes");
  }
  else {
    while(unixFirsTrainTime < now) {
      unixFirsTrainTime.add(parseInt(trainFrequency), 'm');
    }
    trainTimeRemaining = unixFirsTrainTime.diff(moment(), "minutes");
  }  

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  unixFirsTrainTime.format("hh:mm A") + "</td><td>" + trainFrequency + "</td><td>" + trainTimeRemaining + "</td><td>");
});
