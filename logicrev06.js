/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the employee database.
// 4. Create a way to calculate when the next train arrives. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.

// 1. Initialize Firebase
//old firebase code
// var config = {
//   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };



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

  // $("#train-name-input").val("");
  // $("#destination-input").val("");
  // $("#first-train-time-input").val("");
  // $("#frequency-input").val("");

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrainTime = $("first-train-time-input").val().trim();
  
  //moment($("#first-train-time-input").val().trim(), "hh:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  console.log(trainName + "line 54");


  // Creates local "temporary" object for holding train data
  var trainTracker = {
    name: trainName,
    dest: trainDest,
    start: firstTrainTime,
    freq: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(trainTracker);

  // Logs everything to console
  console.log("trainTracker.name",trainTracker.name);
  console.log(".dest", trainTracker.dest);
  console.log(".start", trainTracker.start);
  console.log(".freq", trainTracker.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  // $("#train-name-input").val("");
  // $("#destination-input").val("");
  // $("#first-train-time-input").val("");
  // $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var firstTrainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().freq;

  // Train Info
  console.log("trainName", trainName);
  console.log("trainDest", trainDest);
  console.log("FirstTrainTime", firstTrainTime);
  console.log("trainFrequency", trainFrequency);

  // Prettify the train data
  var trainStart = moment.unix(firstTrainTime).format("hh:mm");
  console.log("trainStart", trainStart);

  // Calculate the time remainig to arrival using hardcore math
  // To calculate the time remaining
  var trainTimeRemaining = firstTrainTime;
  
  //moment().diff(moment.unix(firstTrainTime, "X"), "minutes");
  console.log("trainTimeRemaing", trainTimeRemaining);

  // Calculate the total billed rate
 /// var empBilled = empMonths * empRate;
  //console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  firstTrainTime + "</td><td>" + trainFrequency + "</td><td>" + trainTimeRemaining + "</td><td>");
});

// Train Arrival Math
// -------------------------------------------------------------



// Now we will create code in moment.js to confirm that any attempt we use mets this test case

